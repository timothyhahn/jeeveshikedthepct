<script lang="ts">
	import { onMount } from 'svelte';
	import type { Chapter } from '$lib';

	export let name: string;
	export let part: Chapter;

	let show = false;
	let dom: HTMLElement | null = null;
	let subitem: HTMLElement | null = null;

	let highlightClass = '';
	$: if (part === 'desert') {
		highlightClass = 'hover:bg-desert-400 dark:hover:bg-desert-800';
	} else if (part === 'sierras') {
		highlightClass = 'hover:bg-sierras-400 dark:hover:bg-sierras-800';
	} else if (part === 'norcal') {
		highlightClass = 'hover:bg-norcal-300 dark:hover:bg-norcal-800';
	} else if (part === 'cascades') {
		highlightClass = 'hover:bg-cascades-200 dark:hover:bg-cascades-800';
	} else if (part === 'end') {
		highlightClass = 'hover:bg-end-200 dark:hover:bg-end-800';
	}

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !dom?.contains(event.target)) {
				show = false;
			}

			if (show && subitem?.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="relative inline-block text-left px-3 hover:cursor-pointer" bind:this={dom}>
	<div>
		<button
			type="button"
			class="hover:cursor-pointer rounded px-2 py-1 text-xs font-semibold bg-jeeves-100 text-jeeves-800 dark:bg-jeeves-800 dark:text-jeeves-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
			{highlightClass}
			"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
			on:click={() => (show = !show)}
		>
			{name}
		</button>
	</div>
	{#if show}
		<div
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-jeeves-700 text-jeeves-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
			bind:this={subitem}
		>
			<div class="py-1" role="none">
				<slot />
			</div>
		</div>
	{/if}
</div>
