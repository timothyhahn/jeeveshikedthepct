<script lang='ts'>
	import type { Image } from '$lib/image';
	import Images from '$lib/components/Images.svelte';

	export let images: Image[];
	export let direction: 'left' | 'right' = 'left';
</script>

<div class='flex items-center justify-center'>
	{#if direction === 'left'}
		<div class='shrink max-w-s'>
			<Images {images} />
		</div>
	{/if}
	<p class='px-2'>
		<slot />
	</p>
	{#if direction === 'right'}
		<div class='shrink max-w-s'>
			<Images {images} />
		</div>
	{/if}
</div>