import { fetchMarkdownPosts } from '$lib/utils';

export async function load({ params }) {
	const chapter = await import(`../${params.slug}.md`);
	const { title, part } = chapter.metadata;
	const content = chapter.default;

	// Calculate next and previous chapters
	let nextChapter = null;
	let previousChapter = null;
	const chapters = await fetchMarkdownPosts();

	// fetchMarkdownPosts will always return the chapters in the correct order
	const index = chapters.findIndex((chapter) => chapter.path === params.slug);
	if (index > 0) {
		previousChapter = chapters[index - 1].path;
	}
	if (index < chapters.length - 1) {
		nextChapter = chapters[index + 1].path;
	}

	return {
		content,
		title,
		part,
		nextChapter: nextChapter,
		previousChapter: previousChapter
	};
}
