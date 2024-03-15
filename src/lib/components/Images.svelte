<script lang="ts">
	import type { Image as ImageType } from '$lib/image';
	import Image from './Image.svelte';
	import { displayImage } from '$lib/store';

	export let images: ImageType[];
	export let className: string = '';

	function openImageModal(event) {
		const index: number = event.detail.index;
		displayImage.set({ images, index });
	}
</script>

{#if images.length % 2 === 0 && images.length > 1}
	<span
		class="flex flex-wrap justify-center gap-[10px] after:content-[''] after:basis-[300px] my-3 {className}"
	> {#each images as image, i}
			<Image {image} size={300} index={i} on:openImageModel={openImageModal} />
		{/each}
	</span>
{:else if images.length % 2 === 1 && images.length > 1}
	<span
		class="flex flex-wrap justify-center gap-[10px] after:content-[''] after:basis-[300px] my-3 {className}"
	>
		{#each images.slice(0, -1) as image, i}
			<Image {image} size={300} index={i} on:openImageModel={openImageModal} />
		{/each}
		<Image
			image={images[images.length - 1]}
			size={300}
			mdSize={610}
			index={images.length - 1}
			on:openImageModel={openImageModal}
		/>
	</span>
{:else if images.length === 1}
	<span class="flex flex-wrap justify-center mb-3 {className}">
		<Image image={images[0]} size={300} mdSize={610} index={0} on:openImageModel={openImageModal} />
	</span>
{/if}
