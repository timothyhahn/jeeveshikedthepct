import 'dotenv/config';
import { glob } from 'glob';
import * as fs from 'fs';
import { default as FormData } from 'form-data';

const CLOUDFLARE_API_KEY = process.env['CLOUDFLARE_API_KEY'];
const CLOUDFLARE_ACCOUNT_ID = process.env['CLOUDFLARE_ACCOUNT_ID'];
const CLOUDFLARE_API_PATH = `/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`;
const IMAGE_DELIVERY_URL = 'https://imagedelivery.net/dYSa6ZWs-G98WVtkaZGBFQ/';

// Find all references to "content-photos" images in the markdown files
const markdownFiles = glob.sync('src/routes/chapters/*.md');

// For each file, find all references to "content-photos"
const filesToProcess = [];
markdownFiles.forEach((file) => {
	const contents = fs.readFileSync(file, 'utf8');
	const matches = contents.match(/"(\/content-photos\/.*)"/g);
	if (matches) {
		matches.forEach((match) => {
			// TODO: Fix the regex so I don't have to remove quotes
			const localImagePath = `./static${match.replace(/"/g, '')}`;
			filesToProcess.push({ markdownFile: file, imagePath: localImagePath });
		});
	}
});

// For each image, upload it to Cloudflare
for (const file of filesToProcess) {
	const imagePath = file.imagePath;
	console.log('Uploading image:', imagePath);
	let form = new FormData();
	form.append('file', fs.createReadStream(imagePath));
	form.append('metadata', JSON.stringify({ project: 'jeeveshikedthepct' }));

	const options = {
		host: 'api.cloudflare.com',
		path: CLOUDFLARE_API_PATH,
		method: 'POST',
		protocol: 'https:',
		headers: {
			Authorization: `Bearer ${CLOUDFLARE_API_KEY}`
		}
	};

	const formPromise = new Promise((resolve, reject) => {
		form.submit(options, (err, res) => {
			if (err) {
				return reject(new Error(err.message));
			}

			if (res.statusCode < 200 || res.statusCode > 299) {
				const body = [];
				res.on('data', (chunk) => body.push(chunk));
				res.on('end', () => {
					console.log(Buffer.concat(body).toString());
				});
				return reject(new Error(`HTTP status code ${res.statusCode}`));
			}

			const body = [];
			res.on('data', (chunk) => body.push(chunk));
			res.on('end', () => {
				const resString = Buffer.concat(body).toString();
				resolve(resString);
			});
		});
	});

	const res = await formPromise;
	const result = JSON.parse(res);
	let id = result['result']['id'];
	file.cdnImagePath = `${IMAGE_DELIVERY_URL}${id}`;
	console.log('Uploaded image:', file.cdnImagePath);
	console.log('Updating file:', file.markdownFile);
	const contents = fs.readFileSync(file.markdownFile, 'utf8');
	const newContents = contents.replace(file.imagePath.replace('./static', ''), file.cdnImagePath);
	console.log('Writing to file');
	fs.writeFileSync(file.markdownFile, newContents);
	console.log('Processed image:', file.imagePath);
}
