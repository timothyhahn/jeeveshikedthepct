<script lang="ts">
	import { type ComponentType } from 'svelte';
	import ImageLightbox from '$lib/components/ImageLightbox.svelte';
	import { type Chapter as PartChapter } from '$lib';

	type Chapter = {
		title: string;
		part: PartChapter;
		content: ComponentType;
		nextChapter: null | string;
		previousChapter: null | string;
	};

	export let data: Chapter;

	let horizontalRuleClass = '';
	let footerClass = '';
	$: if (data.part === 'desert') {
		horizontalRuleClass = 'border-desert-700 dark:border-desert-300';
		footerClass =
			'text-desert-800 hover:text-desert-900 dark:text-desert-100 dark:hover:text-desert-200';
	} else if (data.part === 'sierras') {
		horizontalRuleClass = 'border-sierras-400 dark:border-sierras-800';
		footerClass = 'text-sierras-700 hover:text-sierras-800 dark:text-sierras-800';
	} else if (data.part === 'norcal') {
		horizontalRuleClass = 'border-norcal-300 dark:border-norcal-800';
		footerClass = 'text-norcal-700 hover:text-norcal-800 dark:text-norcal-800';
	} else if (data.part === 'cascades') {
		horizontalRuleClass = 'border-cascades-500 dark:border-cascades-300';
		footerClass = 'text-cascades-600 hover:text-cascades-800 dark:text-cascades-300';
	} else if (data.part === 'end') {
		horizontalRuleClass = 'border-end-200 dark:border-end-400';
		footerClass = 'text-end-400 hover:text-end-500 dark:text-end-300';
	}
</script>

<svelte:head>
	<title>Jeeves Hiked the PCT: {data.title}</title>
</svelte:head>

<article class="min-h-[70vh] m">
	<h2 class="text-4xl py-3 mb-6">{data.title}</h2>
	<hr class="border-1 mb-4 {horizontalRuleClass}" />

	<svelte:component this={data.content} />
</article>

<!-- Page Navigation -->
<nav class="flex items-center justify-between lg:px-32 mt-6 font-display" data-sveltekit-reload>
	{#if data.previousChapter}
		<div class="-mt-px flex w-0 flex-1">
			<a class={footerClass} href="/chapters/{data.previousChapter}">Previous</a>
		</div>
	{/if}
	{#if data.nextChapter}
		<div class="-mt-px flex w-0 flex-1 justify-end cursor-pointer">
			<a class={footerClass} href="/chapters/{data.nextChapter}">Next</a>
		</div>
	{/if}
</nav>

<ImageLightbox />
