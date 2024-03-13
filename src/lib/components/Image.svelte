<script lang="ts">
	import type { Image } from '$lib/image';
	import { displayImage } from '$lib/store';
	export let image: Image;
	export let size: number;
	export let mdSize: number = size;

	let imgElement: HTMLImageElement;

	let loading = true;

	$: if (imgElement) {
		if (imgElement.complete) {
			loading = false;
		} else {
			imgElement.addEventListener('load', () => {
				loading = false;
			});
		}
	}

	function openImageModal(event, image: Image) {
		event.preventDefault();
		// Only open on sm and above
		if (window.innerWidth <= 768) return;
		displayImage.set(image);
	}
</script>

<a
	href={`${image.imageUri}/large`}
	target="_blank"
	rel="noopener"
	on:click={(event) => openImageModal(event, image)}
	class="cursor-default md:cursor-pointer relative basis-[{mdSize}px] md:basis-[{mdSize}px] group"
>
	{#if image.caption}
		<div class="absolute top-0 right-0 mt-1 mr-1 w-8 h-8 md:hidden">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-chat"
				><path
					class="fill-jeeves-100"
					d="M2 15V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v15a1 1 0 0 1-1.7.7L16.58 17H4a2 2 0 0 1-2-2z"
				/><path
					class="fill-jeeves-700"
					d="M6 7h12a1 1 0 0 1 0 2H6a1 1 0 1 1 0-2zm0 4h8a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z"
				/></svg
			>
		</div>
	{/if}
	<div class="absolute h-[{size}px] w-[{size}px] md:h-[{mdSize}px] md:w-[{mdSize}px] opacity-50">
		{#if loading}
			<img
				class="mx-auto relative h-full w-12 align-middle"
				src="/tail-spin.svg"
				alt="Loading indicator"
			/>
		{/if}
	</div>
	<img
		bind:this={imgElement}
		loading="lazy"
		class="object-cover align-middle rounded-md h-[{size}px] w-[{size}px] md:h-[{mdSize}px] md:w-[{mdSize}px]"
		src={`${image.imageUri}/public`}
		alt={image.caption}
	/>
	{#if image.caption}
		<div
			class="absolute w-full h-full top-0 left-0 bg-jeeves-900 bg-opacity-50 scale-0 text-white rounded-sm p-3 flex items-center content-center group-hover:scale-100 font-display"
		>
			<span class="mx-auto">
				{image.caption}
			</span>
		</div>
	{/if}
</a>
