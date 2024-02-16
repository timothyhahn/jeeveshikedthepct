<script lang="ts">
	type LinkType = 'book' | 'video';
	export let label: string;
	export let link: string;
	export let type: LinkType;
</script>

<li>
	<a href={link}>{label} ({type})</a>
</li>
