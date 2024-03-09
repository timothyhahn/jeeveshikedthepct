<script lang="ts">
	type LinkType = 'book' | 'video';
	export let label: string;
	export let link: string;
	export let type: LinkType;
</script>

<li class="my-3">
	<a
		href={link}
		class="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-500"
	>
		{#if type === 'book'}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-book-open w-5 inline">
				<g>
					<path
						class="secondary"
						d="M12 21a2 2 0 0 1-1.41-.59l-.83-.82A2 2 0 0 0 8.34 19H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4a5 5 0 0 1 4 2v16z"
					/>
					<path
						class="primary"
						d="M12 21V5a5 5 0 0 1 4-2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.34a2 2 0 0 0-1.42.59l-.83.82A2 2 0 0 1 12 21z"
					/>
				</g>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-videocam w-5 inline">
				<path class="secondary" d="M13.59 12l6.7-6.7A1 1 0 0 1 22 6v12a1 1 0 0 1-1.7.7L13.58 12z" />
				<rect width="14" height="14" x="2" y="5" class="primary" rx="2" />
			</svg>
		{/if}
		<span>{label}</span>
	</a>
</li>

<style lang="scss">
	.primary {
		fill: #b2b7ff;
	}

	.secondary {
		fill: #2f365f;
	}
</style>
