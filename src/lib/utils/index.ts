export const fetchMarkdownPosts = async () => {
	const allChapterFiles = import.meta.glob('/src/routes/chapters/*.md');
	const chapters = await Promise.all(
		Object.entries(allChapterFiles)
			.filter((path) => {
				return !path[0].includes('00-introduction.md');
			})
			.map(async ([path, resolver]) => {
				const { metadata } = await resolver();
				const postPath = path.split('/').pop().split('.').shift();

				return {
					meta: metadata,
					path: postPath
				};
			})
	);

	return chapters.sort((a, b) => {
		return a.path.localeCompare(b.path);
	});
};
