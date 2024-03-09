<script lang="ts">
	import type { Image } from '$lib/image';
	import { displayImage } from '$lib/store';

	export let images: Image[];

	function openImageModal(image: Image) {
		displayImage.set(image);
	}
</script>

{#if images.length > 1}
	<!-- TODO: Unify both images, since they're almost the same, other than the 610px size -->
	<span class="flex flex-wrap justify-center gap-[10px] after:content-[''] after:basis-[300px]">
		{#each images as image}
			<button
				on:click={() => openImageModal(image)}
				class="cursor-pointer relative basis-[300px] group"
			>
				<img
					loading="lazy"
					class="object-cover align-middle rounded-md h-[300px] w-[300px]"
					src={`${image.imageUri}/public`}
					alt={image.caption}
				/>
				<div
					class="absolute w-full h-full top-0 left-0 bg-jeeves-900 bg-opacity-50 scale-0 text-white rounded-sm p-3 flex items-center content-center group-hover:scale-100 font-display"
				>
					<span class="mx-auto">
						{#if image.caption}
							{image.caption}
						{/if}
					</span>
				</div>
			</button>
		{/each}
	</span>
{:else if images.length === 1}
	<span class="flex flex-wrap justify-center">
		<button
			on:click={() => openImageModal(images[0])}
			class="cursor-pointer relative basis-[300px] md:basis-[610px] group"
		>
			<img
				loading="lazy"
				class="object-cover rounded-md align-middle h-[300px] w-[300px] md:h-[610px] md:w-[610px]"
				src={`${images[0].imageUri}/public`}
				alt={images[0].caption}
			/>
			<div
				class="absolute w-full h-full top-0 left-0 bg-jeeves-900 bg-opacity-50 scale-0 text-white rounded-sm p-3 flex items-center content-center group-hover:scale-100 font-display"
			>
				<span class="mx-auto">
					{#if images[0].caption}
						{images[0].caption}
					{/if}
				</span>
			</div>
		</button>
	</span>
{/if}
