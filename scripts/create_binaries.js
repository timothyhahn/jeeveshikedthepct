import { glob } from 'glob';
import * as fs from 'fs';
import { execSync } from 'child_process';

// Get and sort markdown files
const markdownFiles = glob.sync('src/routes/chapters/*.md');
markdownFiles.sort();

// Create new "markdown" file as string;
const frontmatter = `---
title: "Jeeves Hiked the PCT"
author: "Timothy Hahn"
language: "en-US"
---
`;
let completeBook = frontmatter;
let completeBookWithoutImages = frontmatter;

// Add header fields
markdownFiles.forEach((file) => {
	const contents = fs.readFileSync(file, 'utf8').split('\n');
	for (let i = 0; i < contents.length; i++) {
		// Remove anything in between <script> and </script> tags, even over multiple lines
		if (contents[i].includes('<script')) {
			i += 1;
			while (!contents[i].includes('</script>')) {
				i++;
			}
			continue;
		}

		// Remove frontmatter from each MD file
		if (contents[i].includes('---')) {
			i += 1;
			while (!contents[i].includes('---')) {
				// If the frontmatter has a 'title' key, switch it to a header
				const regex = /title: '(.*)'/;
				const match = contents[i].match(regex);
				if (match) {
					completeBook += `\n# ${match[1]}\n`;
					completeBookWithoutImages += `\n# ${match[1]}\n`;
				}

				i++;
			}
			continue;
		}

		completeBook += contents[i] + '\n';
		if (!contents[i].includes('![')) {
			completeBookWithoutImages += contents[i] + '\n';
		}
	}
});

// Write to /static/jeeves-hiked-the-pct.md
console.log('Writing to /static/jeeves-hiked-the-pct.md');
fs.writeFileSync('static/jeeves-hiked-the-pct.md', completeBook);
fs.writeFileSync('static/jeeves-hiked-the-pct-without-images.md', completeBookWithoutImages);

// TODO: Make sure pandoc is actually installed, or find a Node solution
// Convert the markdown file to an ePub
console.log('Converting to ePub');
execSync(
	'pandoc static/jeeves-hiked-the-pct.md -o static/jeeves-hiked-the-pct.epub --epub-cover-image=static/cover.jpg --toc'
);
execSync(
	'pandoc static/jeeves-hiked-the-pct-without-images.md -o static/jeeves-hiked-the-pct-without-images.epub --toc'
);

// Convert the markdown file to a PDF
console.log('Converting to PDF');
execSync('pandoc static/jeeves-hiked-the-pct.md -o static/jeeves-hiked-the-pct.pdf --toc');
execSync(
	'pandoc static/jeeves-hiked-the-pct-without-images.md -o static/jeeves-hiked-the-pct-without-images.pdf --toc'
);

// Use ebook-convert to convert the ePub to a mobi
// Commenting out for now, since the resulting files are super unsatisfactory.
/**
console.log("Converting to MOBI");
execSync('ebook-convert "static/jeeves-hiked-the-pct.epub" "static/jeeves-hiked-the-pct.mobi"');
execSync('ebook-convert "static/jeeves-hiked-the-pct-without-images.epub" "static/jeeves-hiked-the-pct-without-images.mobi"');
**/
