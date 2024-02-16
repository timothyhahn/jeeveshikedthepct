<script lang="ts">
	import type { ComponentType } from 'svelte';

	type Chapter = {
		title: string;
		content: ComponentType;
	};
	export let data: Chapter;
</script>

<article>
	<h1>{data.title}</h1>
	<svelte:component this={data.content} />
</article>