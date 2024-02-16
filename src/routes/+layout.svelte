<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Content from '$lib/components/Content.svelte';
	export let data;
</script>

<Header chapters={data.chapters} />
<Content>
	<slot />
</Content>
<Footer />

<style>
	:global(p) {
		padding: 1rem 0;
	}
</style>
