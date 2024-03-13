<script lang="ts">
	import { displayImage } from '$lib/store';
	import type { Image } from '$lib/image';
	import { onDestroy, onMount } from 'svelte';

	let image: Image | null;
	let width: number;
	let loading = true;
	let modal: HTMLDivElement;
	let modalImage: HTMLImageElement;
	let display: HTMLDivElement;

	const unsubscribe = displayImage.subscribe((img) => {
		if (img) {
			image = img;
		}
	});

	onDestroy(() => {
		unsubscribe();
	});

	onMount(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeImage();
			}
		};

		const handleClick = (event: MouseEvent) => {
			if (!modal || !display) {
				return;
			}
			if (modal.contains(event.target as Node) && !display.contains(event.target as Node)) {
				closeImage();
			}
		};

		document.addEventListener('keyup', handleEscape, false);
		document.addEventListener('click', handleClick, false);

		return () => {
			document.removeEventListener('keyup', handleEscape, false);
			document.removeEventListener('click', handleClick, false);
		};
	});

	$: if (image && modalImage) {
		if (modalImage.complete) {
			loading = false;
		} else {
			modalImage.addEventListener('load', () => {
				loading = false;
			});
		}
	}

	$: if (image && width >= 768) {
		document.body.classList.add('overflow-hidden');
	}

	$: if (width < 768) {
		closeImage();
	}

	function closeImage() {
		displayImage.set(null);
		document.body.classList.remove('overflow-hidden');
		image = null;
		loading = true;
	}
</script>

<svelte:window bind:innerWidth={width} />

{#if image}
	<!-- Only open on sm and above -->
	<div
		id="modal"
		bind:this={modal}
		class="hidden fixed top-0 left-0 z-50 w-screen h-screen bg-gray-900 bg-opacity-90 sm:flex justify-center items-center"
	>
		<button class="fixed z-60 top-1 right-3 text-white text-3xl font-bold" on:click={closeImage}
			>&times
		</button>
		<div class="h-[100vh] my-auto flex flex-col" bind:this={display}>
			<div
				class="text-center text-jeeves-100 text-xl h-[3%] mt-12 align-middle flex-shrink font-display"
			>
				{#if image.caption}
					{image.caption}
				{/if}
			</div>
			<div class="mt-3 h-[85%] flex-grow">
				<img
					bind:this={modalImage}
					class="mx-auto my-auto max-h-[99%] z-50 align-middle shadow-jeeves-900 shadow-xl rounded-md"
					src={`${image.imageUri}/large`}
					alt={image.caption}
				/>
				{#if loading}
					<img class="top-1/2 left-1/2 fixed -z-10" src="/puff.svg" alt="Loading indicator" />
				{/if}
			</div>
		</div>
	</div>
{/if}
