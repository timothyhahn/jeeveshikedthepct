export async function load({ params }) {
	const chapter = await import(`../${params.slug}.md`);
	const { title } = chapter.metadata;
	const content = chapter.default;

	return {
		content,
		title,
	};
}