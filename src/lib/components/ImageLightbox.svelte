<script lang="ts">
	import { displayImage } from '$lib/store';
	import type { Image } from '$lib/image';
	import { onDestroy, onMount } from 'svelte';

	let image: Image | null;

	const unsubscribe = displayImage.subscribe((img) => {
		if (img) {
			image = img;
		}
	});

	onDestroy(() => {
		unsubscribe();
	});

	onMount(() => {
		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				closeImage();
			}
		};

		document.addEventListener('keyup', handleEscape, false);

		return () => {
			document.removeEventListener('keyup', handleEscape, false);
		};
	});

	$: if (image) {
		document.body.classList.add('overflow-hidden');
	}

	function closeImage() {
		displayImage.set(null);
		document.body.classList.remove('overflow-hidden');
		image = null;
	}
</script>

{#if image}
	<div id="modal" class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-90">
		<button class="fixed z-60 top-6 right-8 text-white text-5xl font-bold" on:click={closeImage}
			>&times;
		</button>
		<div class="flex justify-center align-middle">
			<div class="h-[100vh] my-auto">
				<img
					class="max-w-[90%] max-h-[85%] mx-auto mt-[10%]"
					src={image.imageUri}
					alt={image.caption}
				/>
				{#if image.caption}
					<div class="text-center text-gray-50 text-xl">{image.caption}</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
