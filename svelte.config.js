import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';
import remarkUnwrapImages from 'remark-unwrap-images'
import remarkConvertImgToImagesComponent from './src/lib/plugins/remark-convert-img-to-images-component.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: true,
			remarkPlugins: [remarkUnwrapImages, remarkConvertImgToImagesComponent],
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['/chapters/01-chapter-1', '/', '/api/chapters']
		}
	},
	inlineStyleThreshold: 1024
};

export default config;
