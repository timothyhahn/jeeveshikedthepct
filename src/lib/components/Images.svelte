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

{#if images.length > 1}
	<button on:click={goLeft}>left</button>
{/if}

<figure>
	<img src={images[currentIdx].imageUri} alt={images[currentIdx].caption} />
	<figcaption>
		{#if images.length > 1}
			{currentIdx + 1} / {images.length}
		{/if}
		{images[currentIdx].caption}
	</figcaption>
</figure>

{#if images.length > 1}
	<button on:click={goRight}>right</button>
{/if}
