<script lang="ts">
	import { onMount } from 'svelte';
	import type { Chapter } from '$lib';

	export let link: string; // Relative path, such as /01-chapter-1
	export let part: Chapter;

	let highlightClass = '';
	$: if (part === 'desert') {
		highlightClass = 'hover:bg-desert-200 dark:hover:bg-desert-900 dark:hover:text-jeeves-100';
	} else if (part === 'sierras') {
		highlightClass = 'hover:bg-sierras-800 dark:hover:bg-sierras-800 dark:hover:text-jeeves-100';
	} else if (part === 'norcal') {
		highlightClass = 'hover:bg-norcal-600 dark:hover:bg-norcal-800 dark:hover:text-jeeves-100';
	} else if (part === 'cascades') {
		highlightClass = 'hover:bg-cascades-600 dark:hover:bg-cascades-800 dark:hover:text-jeeves-100';
	} else if (part === 'end') {
		highlightClass = 'hover:bg-end-400 dark:hover:bg-end-500 dark:hover:text-jeeves-100';
	}
	const id = link.replace(/\//, ''); // Remove all slashes to get an ID
	let activityClass = 'text-jeeves-900';
	onMount(() => {
		if (`${link}/` === location.pathname) {
			activityClass = 'bg-jeeves-600 text-jeeves-100';
		}
	});
</script>

<a
	data-sveltekit-reload
	href={link}
	class="{activityClass} block px-4 py-2 text-sm hover:cursor-pointer {highlightClass}"
	role="menuitem"
	tabindex="-1"
	{id}><slot /></a
>
