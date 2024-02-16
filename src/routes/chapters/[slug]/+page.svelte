<script lang='ts'>
	import type { ComponentType } from 'svelte';

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

<article>
	<h2>{data.title}</h2>

	<svelte:component this={data.content} />
</article>

<!-- Page Navigation -->
<nav class='flex items-center justify-between px-32'>
	{#if data.previousChapter}
		<div class='-mt-px flex w-0 flex-1'>
			<a href='/{data.previousChapter}'>Previous</a>
		</div>
	{/if}
	{#if data.nextChapter}
		<div class='-mt-px flex w-0 flex-1 justify-end'>
			<a href='/chapters/{data.nextChapter}'>Next</a>
		</div>
	{/if}
</nav>
