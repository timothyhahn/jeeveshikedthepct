<script lang="ts">
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	type Chapter = {
		meta: {
			title: string,
			part: string,
		},
		path: string,
	};

	export let chapters: Chapter[];
	const chaptersMap = {};
	const parts = [
		{ name: 'Part 1 - The Desert', id: 'desert' },
		{ name: 'Part 2 - The Sierras', id: 'sierras' },
		{ name: 'Part 3 - Northern California and Fires', id: 'norcal' },
		{ name: 'Part 4 - Northern Oregon and Washington', id: 'cascades' },
		{ name: 'Part 5 - The End', id: 'end' },
	];


	chapters.forEach((chapter) => {
		if (!chaptersMap[chapter.meta.part]) {
			chaptersMap[chapter.meta.part] = [chapter];
		} else {
			chaptersMap[chapter.meta.part].push(chapter);
		}
	});

</script>

<div class="bg-white py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
				Jeeves Hiked the PCT
			</h2>
			{#each parts as part}
				<Dropdown name={part.name}>
					{#each chaptersMap[part.id] as chapter}
						<DropdownItem link={`/chapters/${chapter.path}`}>{chapter.meta.title}</DropdownItem>
					{/each}
				</Dropdown>
			{/each}
		</div>
	</div>
</div>
