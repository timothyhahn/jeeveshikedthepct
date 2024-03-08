<script lang="ts">
	import { type ComponentType, onMount } from 'svelte';
	import ImageLightbox from '$lib/components/ImageLightbox.svelte';
	import { browser } from '$app/environment';

	type Chapter = {
		title: string;
		content: ComponentType;
		nextChapter: null | string;
		previousChapter: null | string;
	};
	export let data: Chapter;
	$: if (browser && data) {
		document.body.classList.remove('overflow-hidden');
		window.scrollTo(0, 0);
	}
	onMount(() => {
		document.body.classList.remove('overflow-hidden');
		window.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>Jeeves Hiked the PCT: {data.title}</title>
</svelte:head>

<article class="min-h-[70vh] m">
	<h2 class="text-4xl py-3 mb-6">{data.title}</h2>

	<svelte:component this={data.content} />
</article>

<!-- Page Navigation -->
<nav class="flex items-center justify-between lg:px-32 mt-6">
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
