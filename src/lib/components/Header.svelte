<script lang="ts">
	import DropdownItem from '$lib/components/DropdownItem.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { type Chapter as ChapterPart } from '$lib';

	type Chapter = {
		meta: {
			title: string;
			part: string;
		};
		path: string;
	};

	export let chapters: Chapter[];
	const chaptersMap = {};
	const parts = [
		{ name: 'Part 1 - The Desert', id: 'desert' },
		{ name: 'Part 2 - The Sierras', id: 'sierras' },
		{ name: 'Part 3 - Northern California and Fires', id: 'norcal' },
		{ name: 'Part 4 - Northern Oregon and Washington', id: 'cascades' },
		{ name: 'Part 5 - The End', id: 'end' }
	];

	chapters.forEach((chapter) => {
		if (!chaptersMap[chapter.meta.part]) {
			chaptersMap[chapter.meta.part] = [chapter];
		} else {
			chaptersMap[chapter.meta.part].push(chapter);
		}
	});

	// Mobile menu switch
	export let showMobileMenu: boolean = false;

	$: if (showMobileMenu) {
		document.body.classList.add('overflow-hidden');
	}

	function closeMobileMenu() {
		showMobileMenu = false;
		document.body.classList.remove('overflow-hidden');
	}

	function getPartClass(id: ChapterPart) {
		switch (id) {
			case 'desert':
				return 'text-desert-400';
			case 'sierras':
				return 'text-sierras-500';
			case 'norcal':
				return 'text-norcal-600';
			case 'cascades':
				return 'text-cascades-400';
			case 'end':
				return 'text-end-200';
		}
	}
</script>

<header>
	<nav
		class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
		aria-label="Global"
		data-sveltekit-reload
	>
		<!-- Title -->
		<div class="flex lg:flex-1">
			<a href="/"><h1 class="w-auto text-lg">Jeeves Hiked the PCT</h1></a>
		</div>

		<!-- Main Dropdown menus -->
		<div class="lg:flex hidden">
			{#each parts as part}
				<Dropdown name={part.name} part={part.id}>
					{#each chaptersMap[part.id] as chapter}
						<DropdownItem link={`/chapters/${chapter.path}`} part={part.id}
							>{chapter.meta.title}</DropdownItem
						>
					{/each}
				</Dropdown>
			{/each}
		</div>

		<!-- Mobile menu opener -->
		<div class="lg:hidden flex">
			<button
				type="button"
				class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-jeeves-800 dark:text-jeeves-100"
				on:click={() => {
					showMobileMenu = true;
				}}
			>
				<span class="sr-only">Open main menu</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
	</nav>
	<!-- Mobile Menu -->
	{#if showMobileMenu}
		<div class="lg:hidden" role="dialog" aria-modal="true">
			<div class="fixed inset-0 z-10"></div>
			<div
				class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-jeeves-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-jeeves-900/10"
			>
				<div class="flex items-center justify-end">
					<button
						type="button"
						class="-m-2.5 rounded-md p-2.5 text-jeeves-100"
						on:click={closeMobileMenu}
					>
						<span class="sr-only">Close menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
				<div class="mt-6 flow-root">
					<div class="-my-6 divide-y divide-jeeves-500/10">
						{#each parts as part}
							<div class="py-6">
								<div class="font-bold py-3 {getPartClass(part.id)}">{part.name}</div>
								{#each chaptersMap[part.id] as chapter}
									<a
										data-sveltekit-reload
										href={`/chapters/${chapter.path}`}
										on:click={() => (showMobileMenu = false)}
										class="mx-5 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-jeeves-100 hover:bg-jeeves-50 hover:text-jeeves-800"
										>{chapter.meta.title}</a
									>
								{/each}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</header>
