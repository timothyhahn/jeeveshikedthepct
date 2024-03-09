<script lang="ts">
	import type { Image } from '$lib/image';
	import { displayImage } from '$lib/store';

	export let images: Image[];
	export let className: string = '';

	function openImageModal(event, image: Image) {
		event.preventDefault();
		// Only open on sm and above
		if (window.innerWidth <= 768) return;
		displayImage.set(image);
	}
</script>

{#if images.length > 1}
	<!-- TODO: Unify both images, since they're almost the same, other than the 610px size -->
	<span
		class="flex flex-wrap justify-center gap-[10px] after:content-[''] after:basis-[300px] my-3 {className}"
	>
		{#each images as image}
			<a
				href={`${image.imageUri}/large`}
				target="_blank"
				rel="noopener"
				on:click={(event) => openImageModal(event, image)}
				class="cursor-default md:cursor-pointer relative basis-[300px] group"
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
				<img
					loading="lazy"
					class="object-cover align-middle rounded-md h-[300px] w-[300px]"
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
		{/each}
	</span>
{:else if images.length === 1}
	<span class="flex flex-wrap justify-center mb-3 {className}">
		<a
			href={`${images[0].imageUri}/large`}
			target="_blank"
			rel="noopener"
			on:click={(event) => openImageModal(event, images[0])}
			class="cursor-default md:cursor-pointer relative basis-[300px] md:basis-[610px] group"
		>
			{#if images[0].caption}
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
			<img
				loading="lazy"
				class="object-cover rounded-sm align-middle h-[300px] w-[300px] md:h-[610px] md:w-[610px]"
				src={`${images[0].imageUri}/medium`}
				alt={images[0].caption}
			/>

			{#if images[0].caption}
				<div
					class="absolute w-full h-full top-0 left-0 bg-jeeves-900 bg-opacity-50 scale-0 text-white rounded-sm p-3 flex items-center content-center group-hover:scale-100 font-display"
				>
					<span class="mx-auto">
						{images[0].caption}
					</span>
				</div>
			{/if}
		</a>
	</span>
{/if}
