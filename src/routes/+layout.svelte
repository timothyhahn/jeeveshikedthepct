<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Content from '$lib/components/Content.svelte';
</script>

<Header />
<Content>
	<slot />
</Content>
<Footer />
