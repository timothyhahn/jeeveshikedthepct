<script lang="ts">
	import { displayImage, type DisplayImageInLightbox } from '$lib/store';
	import type { Image } from '$lib/image';
	import { onDestroy, onMount } from 'svelte';

	let images: Image[];
	let selectedIndex: number;
	let width: number;
	let loading = true;
	let modal: HTMLDivElement;
	let modalImage: HTMLImageElement;
	let display: HTMLDivElement;

	const unsubscribe = displayImage.subscribe((displayImage: DisplayImageInLightbox | null) => {
		if (displayImage) {
			images = displayImage.images;
			selectedIndex = displayImage.index;
			loading = true;
		}
	});

	onDestroy(() => {
		unsubscribe();
	});

	onMount(() => {
		const handleKeys = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				closeImage(image);
			}
			if (event.key === 'ArrowLeft') {
				goLeft(selectedIndex);
			}
			if (event.key === 'ArrowRight') {
				goRight(selectedIndex);
			}
		};

		const handleClick = (event: MouseEvent) => {
			if (!modal || !display) {
				return;
			}
			if (modal.contains(event.target as Node) && !display.contains(event.target as Node)) {
				closeImage(image);
			}
		};

		document.addEventListener('keyup', handleKeys, false);
		document.addEventListener('click', handleClick, false);

		return () => {
			document.removeEventListener('keyup', handleKeys, false);
			document.removeEventListener('click', handleClick, false);
		};
	});
	$: image = images?.[selectedIndex];
	$: largeImageUri = `${image?.imageUri.replace('.jpeg', '-large.jpeg')}`;
	$: largeImageAvif = `${largeImageUri?.replace('.jpeg', '.avif')}`;
	$: largeImageWebp = `${largeImageUri?.replace('.jpeg', '.webp')}`;

	$: if (image && modalImage) {
		if (modalImage.complete) {
			setTimeout(() => {
				loading = false;
			}, 10000);
		} else {
			modalImage.addEventListener('load', () => {
				setTimeout(() => {
					loading = false;
				}, 10000);
			});
		}
	}

	$: if (image && width >= 768) {
		document.body.classList.add('overflow-hidden');
	}

	$: if (width < 768) {
		closeImage(images);
	}

	function closeImage(_: Image[]) {
		displayImage.set(null);
		document.body.classList.remove('overflow-hidden');
		images = [];
		selectedIndex = 0;
		image = null;
	}

	function goLeft(_: number) {
		loading = true;
		if (selectedIndex === 0) {
			selectedIndex = images.length - 1;
		} else {
			selectedIndex--;
		}
	}

	function goRight(_: number) {
		loading = true;
		if (selectedIndex === images.length - 1) {
			selectedIndex = 0;
		} else {
			selectedIndex++;
		}
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
			{#if images.length > 1}
				<button
					class="text-white fixed left-1.5 xl:left-12 top-12 xl:top-1/2"
					on:click={() => {
						goLeft(selectedIndex);
					}}>&#60;</button
				>
			{/if}
			{#if images.length > 1}
				<button
					class="text-white fixed right-1.5 xl:right-12 top-12 xl:top-1/2"
					on:click={() => {
						goRight(selectedIndex);
					}}>&#62;</button
				>
			{/if}
			<div class="mt-3 h-[85%] flex-grow">
				{#key selectedIndex}
					<picture>
						<source srcset={largeImageAvif} type="image/avif" />
						<source srcset={largeImageWebp} type="image/webp" />
						<source srcset={largeImageUri} type="image/jpeg" />
						<img
							bind:this={modalImage}
							id={image.imageUri}
							class="mx-auto my-auto max-h-[99%] z-50 align-middle shadow-jeeves-900 shadow-xl rounded-md"
							src={largeImageUri}
							alt={image.caption}
						/>
					</picture>
				{/key}

				{#if loading}
					<img class="left-1/2 top-1/2 fixed -z-10" src="/puff.svg" alt="Loading indicator" />
				{/if}
			</div>
			{#if images.length > 1}
				<div class="left-1/2 bottom-0 fixed">
					<p class="text-white text-xl font-display">{selectedIndex + 1}/{images.length}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}
