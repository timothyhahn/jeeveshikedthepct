<script lang="ts">
	import type { Image } from '$lib/image';
	import Images from '$lib/components/Images.svelte';

	export let images: Image[];
	export let direction: 'left' | 'right' = 'left';
</script>

{#if direction === 'left'}
	<Images {images} />
{/if}
<p>
	<slot />
</p>
{#if direction === 'right'}
	<Images {images} />
{/if}
