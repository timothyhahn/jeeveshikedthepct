import { fetchMarkdownPosts } from '$lib/utils';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	if (params.slug === '00-introduction') {
		error(404);
	}
	const chapter = await import(`../${params.slug}.md`);
	const { title, part } = chapter.metadata;
	const content = chapter.default;

	// Calculate next and previous chapters
	let nextChapter = null;
	let nextChapterSection = null;
	let previousChapter = null;
	let previousChapterSection = null;
	const chapters = await fetchMarkdownPosts();

	// fetchMarkdownPosts will always return the chapters in the correct order
	const index = chapters.findIndex((chapter) => chapter.path === params.slug);
	if (index > 0) {
		previousChapter = chapters[index - 1].path;
		previousChapterSection = chapters[index - 1].meta.part;
	}
	if (index < chapters.length - 1) {
		nextChapter = chapters[index + 1].path;
		nextChapterSection = chapters[index + 1].meta.part;
	}

	return {
		content,
		title,
		part,
		nextChapter,
		nextChapterSection,
		previousChapter,
		previousChapterSection,
	};
}
