<script lang="ts">
	import { onMount } from 'svelte';

	export let link: string; // Relative path, such as /01-chapter-1
	const id = link.replace(/\//, ''); // Remove all slashes to get an ID
	let activityClass = 'text-gray-300';
	onMount(() => {
		if (`${link}/` === location.pathname) {
			activityClass = 'bg-gray-600 text-gray-100';
		}
	});
</script>

<a
	data-sveltekit-reload
	href={link}
	class="{activityClass} block px-4 py-2 text-sm hover:cursor-pointer hover:bg-gray-800"
	role="menuitem"
	tabindex="-1"
	{id}><slot /></a
>
