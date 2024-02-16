export const fetchMarkdownPosts = async () => {
	const allChapterFiles = import.meta.glob('/src/routes/chapters/*.md');

	return await Promise.all(
		Object.entries(allChapterFiles).map(async ([path, resolver]) => {
			const { metadata } = await resolver();
			const postPath = path.split('/').pop().split('.').shift();

			return {
				meta: metadata,
				path: postPath,
			};
		})
	)
}