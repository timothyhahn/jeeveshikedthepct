<script lang="ts">
	import { onMount } from 'svelte';

	export let link: string; // Relative path, such as /01-chapter-1
	const id = link.replace(/\//, ''); // Remove all slashes to get an ID
	let activityClass = 'text-gray-700';
	onMount(() => {
		if (link === location.pathname) {
			activityClass = 'bg-gray-100 text-gray-900';
		}
	});
</script>

<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
<a href={link} class="{activityClass} block px-4 py-2 text-sm" role="menuitem" tabindex="-1" {id}
	><slot /></a
>
