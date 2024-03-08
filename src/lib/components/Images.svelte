<script lang="ts">
	import type { Image } from '$lib/image';
	import { displayImage } from '$lib/store';

	export let images: Image[];

	function openImageModal(image: Image) {
		displayImage.set(image);
	}
</script>

<div class="my-5">
	{#each Array(Math.ceil(images.length / 2)) as _, i}
		<div class="">
			{#each images.slice(i * 2, i * 2 + 2) as image}
				<button on:click={() => openImageModal(image)} class="mx-3">
					<figure class="inline-block hover:bg-gray-70 hover-img rounded-sm">
						<img
							loading="lazy"
							class="object-cover rounded-md {images.length % 2 === 0 ||
							images.slice(i * 2, i * 2 + 2).length === 2
								? 'h-[300px] w-[300px]'
								: 'h-[600px] w-[600px]'}"
							src={image.imageUri}
							alt={image.caption}
						/>

						{#if image.caption}
							<figcaption class="text-sm">
								{image.caption}
							</figcaption>
						{/if}
					</figure>
				</button>
			{/each}
		</div>
	{/each}
</div>

<style>
	@media (hover) {
		img:hover {
			opacity: 0.1;
		}
	}

	.hover-img {
		color: #e8e8e8;
		background-color: #131313;
		display: inline-block;
		overflow: hidden;
		position: relative;
		text-align: center;
		width: 100%;
	}

	.hover-img * {
		box-sizing: border-box;
		transition: all 0.45s ease;
	}

	.hover-img img {
		vertical-align: top;
		backface-visibility: hidden;
	}

	.hover-img figcaption {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		align-items: center;
		z-index: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		line-height: 1.1em;
		opacity: 0;
		transition-delay: 0.1s;
		font-family: sans-serif;
		font-weight: 400;
		letter-spacing: 1px;
	}

	.hover-img:hover::before,
	.hover-img:hover::after {
		transform: scale(1);
		opacity: 1;
	}

	.hover-img:hover > img {
		opacity: 0.6;
	}

	.hover-img:hover figcaption {
		opacity: 1;
	}
</style>
