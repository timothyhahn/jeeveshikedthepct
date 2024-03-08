<script lang="ts">
	import { type ComponentType } from 'svelte';
	import ImageLightbox from '$lib/components/ImageLightbox.svelte';

	type Chapter = {
		title: string;
		content: ComponentType;
		nextChapter: null | string;
		previousChapter: null | string;
	};
	export let data: Chapter;
</script>

<svelte:head>
	<title>Jeeves Hiked the PCT: {data.title}</title>
</svelte:head>

<article class="min-h-[70vh] m">
	<h2 class="text-4xl py-3 mb-6">{data.title}</h2>

	<svelte:component this={data.content} />
</article>

<!-- Page Navigation -->
<nav class="flex items-center justify-between lg:px-32 mt-6" data-sveltekit-reload>
	{#if data.previousChapter}
		<div class="-mt-px flex w-0 flex-1">
			<a class="text-blue-400 hover:text-blue-600" href="/chapters/{data.previousChapter}"
				>Previous</a
			>
		</div>
	{/if}
	{#if data.nextChapter}
		<div class="-mt-px flex w-0 flex-1 justify-end cursor-pointer">
			<a class="text-blue-400 hover:text-blue-600" href="/chapters/{data.nextChapter}">Next</a>
		</div>
	{/if}
</nav>

<ImageLightbox />
