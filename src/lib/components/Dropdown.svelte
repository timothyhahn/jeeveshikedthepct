<script lang="ts">
	import { onMount } from 'svelte';

	export let name: string;
	let show = false;
	let dom: HTMLElement | null = null;
	let subitem: HTMLElement | null = null;

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
			class="hover:cursor-pointer rounded bg-gray-800 px-2 py-1 text-xs font-semibold text-gray-200 hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-700 text-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
