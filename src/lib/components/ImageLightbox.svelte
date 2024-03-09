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
	<div
		id="modal"
		class="fixed top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-90 flex justify-center items-center"
	>
		<button class="fixed z-60 top-6 right-8 text-white text-5xl font-bold" on:click={closeImage}
			>&times;
		</button>
		<div class="h-[100vh] my-auto flex flex-col">
			{#if image.caption}
				<div class="text-center text-gray-50 text-xl align-middle mt-24 md:mt-auto">
					{image.caption}
				</div>
			{/if}
			<img
				class="max-w-[90%] max-h-[85%] mx-auto my-auto z-50 align-middle"
				src={`${image.imageUri}/large`}
				alt={image.caption}
			/>
			<img class="top-1/2 left-1/2 fixed -z-10" src="/puff.svg" alt="Loading indicator" />
		</div>
	</div>
{/if}
