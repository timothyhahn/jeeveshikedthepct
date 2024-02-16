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

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="relative inline-block text-left" bind:this={dom}>
	<div>
		<button
			type="button"
			class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
			on:click={() => (show = !show)}
		>
			{name}
			<svg
				class="-mr-1 h-5 w-5 text-gray-400"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	<!--
		Dropdown menu, show/hide based on menu state.

		Entering: "transition ease-out duration-100"
			From: "transform opacity-0 scale-95"
			To: "transform opacity-100 scale-100"
		Leaving: "transition ease-in duration-75"
			From: "transform opacity-100 scale-100"
			To: "transform opacity-0 scale-95"
	-->
	{#if show}
		<div
			class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
