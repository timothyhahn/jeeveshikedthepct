export const prerender = true;
export const trailingSlash = 'always';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/chapters');
	const chapters = await response.json();
	return { chapters };
};
