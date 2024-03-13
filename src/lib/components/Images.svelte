<script lang="ts">
	import type { Image as ImageType } from '$lib/image';
	import Image from './Image.svelte';

	export let images: ImageType[];
	export let className: string = '';
</script>

{#if images.length > 1}
	<!-- TODO: Unify both images, since they're almost the same, other than the 610px size -->
	<span
		class="flex flex-wrap justify-center gap-[10px] after:content-[''] after:basis-[300px] my-3 {className}"
	>
		{#each images as image}
			<Image {image} size={300} />
		{/each}
	</span>
{:else if images.length === 1}
	<span class="flex flex-wrap justify-center mb-3 {className}">
		<Image image={images[0]} size={300} mdSize={610} />
	</span>
{/if}
