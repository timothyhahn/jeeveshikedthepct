import { visit } from 'unist-util-visit';

function toImagesNode(images, position) {
	let imagesComponent = '<Images images={[\n';

	images.forEach((image) => {
		imagesComponent += '{\n';
		imagesComponent += `"imageUri": "${image.url}",\n`;
		if (image.alt) {
			imagesComponent += `"caption": "${image.alt}"\n`;
		}
		imagesComponent += '},\n';
	});
	imagesComponent += ']} />';

	return {
		type: 'html',
		value: imagesComponent,
		position: position
	};
}

function isPartOfImages(node) {
	return node.type === 'image' || (node.type === 'text' && node.value === '\n');
}
export default function remarkConvertImgToImagesComponent() {
	return function (tree) {
		visit(tree, 'image', (node, index, parent) => {
			// Find position of the next non-image node
			let position = index + 1;
			while (position < parent.children.length && isPartOfImages(parent.children[position])) {
				position++;
			}

			// Extract all images from current index to position of next non-image node into an array
			let images = [];
			for (let i = index; i < position; i++) {
				if (parent.children[i].type === 'image') {
					images.push(parent.children[i]);
				}
			}

			// Replace the images with the Images component
			parent.children.splice(index, position - index, toImagesNode(images, index));
		});
	};
}
