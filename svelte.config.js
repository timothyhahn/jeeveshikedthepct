import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess(),
		mdsvex({
			extensions: ['.md'],
			smartypants: true
		})
	],
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter(),
		prerender: {
			entries: ['/chapters/01-chapter-1', '/', '/api/chapters']
		}
	}
};

export default config;
