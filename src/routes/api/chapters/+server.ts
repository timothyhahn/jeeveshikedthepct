import { fetchMarkdownPosts } from '$lib/utils';
import { json } from '@sveltejs/kit';

export const prerender = true;
export const GET = async () => {
	return json(await fetchMarkdownPosts());
};
