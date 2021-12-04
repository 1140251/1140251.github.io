<script context="module" lang="ts">
	export async function load({ page, fetch, session, context }) {
		let response = {};
		if (page.path === '/home') {
			response = { status: 302, redirect: '/' };
		}
		return await Promise.resolve(response);
	}
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import Nav from '../components/navbar.svelte';
	import PageTransition from '../components/pageTransition.svelte';
</script>

<Nav />

<main>
	<PageTransition refresh={$page.path}>
		<slot />
	</PageTransition>
</main>

<style>
	main {
		margin-left: max(260px, 15vw);
		color: white;
	}

	@media screen and (max-width: 1024px) {
		main {
			margin-left: 0;
		}
	}
</style>
