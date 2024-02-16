<script lang="ts">
	import type { Image } from '$lib/image';

	export let images: Image[];
	let currentIdx = 0;

	function goLeft() {
		if (currentIdx > 0) {
			currentIdx -= 1;
		} else {
			currentIdx = images.length - 1;
		}
	}

	function goRight() {
		if (currentIdx < images.length - 1) {
			currentIdx += 1;
		} else {
			currentIdx = 0;
		}
	}
</script>

<figure class="h-2/3">
	<div class="absolute">
		{#if images.length > 1}
			<button class="" on:click={goLeft}>&#8249;</button>
		{/if}
		{#if images.length > 1}
			<button class="relative right-1" on:click={goRight}>&#8250;</button>
		{/if}
	</div>
	<img src={images[currentIdx].imageUri} alt={images[currentIdx].caption} />
	<figcaption>
		{#if images.length > 1}
			{currentIdx + 1} / {images.length}
		{/if}
		{images[currentIdx].caption}
	</figcaption>
</figure>
