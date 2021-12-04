<!-- <script context="module" lang="ts">
	export async function load({ page, fetch }) {
		const slug = page.params.slug;

		return fetch(`/blog/${slug}.json`)
			.then((r) => r.json())
			.then((data) => {
				return {
					props: { post: data.post, recent: data.recent, tags: data.tags }
				};
			});
	}
</script> -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let title;
	export let author;
	export let description;
	export let tags;
	export let date;
	export let printReadingTime;

	import PostInfo from './post-info.svelte';
	import Search from './search.svelte';

	onMount(() => {
		if (!title) {
			goto('/404');
		}

		if (tags) {
			tags = tags.split(',').map(function (item) {
				return item.trim();
			});
		}

		date = date
			? new Date(date).toLocaleDateString('en-EN', {
					weekday: 'long',
					year: 'numeric',
					month: 'long',
					day: 'numeric'
			  })
			: null;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="description" content={description} />
	<meta name="keywords" content={tags} />
</svelte:head>

<div class="container">
	<div class="content">
		<div class="row">
			<div class="article-content">
				<header>
					<h1 class="post-title">{title}</h1>
					<PostInfo {author} {date} readingTime={printReadingTime} />
					{#if tags}
						<ul class="tags">
							{#each tags as tag}
								<a href={`/blog?tag=${tag}`}>{tag}</a>
							{/each}
						</ul>
					{/if}
				</header>
				<article>
					<slot />
				</article>
			</div>
			<div class="sidebar">
				<Search />
			</div>
		</div>
	</div>
</div>

<style>
	.content {
		padding: 50px 0 20px 0;
	}

	.row {
		flex-direction: row;
		gap: 30px;
	}

	.article-content {
		flex: 2;
		padding: 30px 25px 15px;
		background: white;
		box-shadow: 0 0 20px rgb(0 0 0 / 20%);
		box-sizing: border-box;
		border-radius: 15px !important;
	}

	.sidebar {
		flex: 1;
	}

	.post-title {
		font-weight: 700;
		font-size: 36px;
		color: var(--jacarta);
		line-height: 1.2;
	}

	.tags a {
		color: var(--jacarta);
		cursor: pointer;
		outline: 0;
		text-decoration: none;
	}

	.tags a:not(:last-child):after {
		content: '';
		background: var(--cool-grey);
		border-radius: 50%;
		display: inline-block;
		height: 3px;
		margin-left: 0.6rem;
		vertical-align: middle;
		width: 3px;
	}

	.tags {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		gap: 0.6rem;
	}

	.tags a:hover {
		color: var(--magic-potion);
	}

	article {
		color: var(--dark-blue);
		margin-top: 1.5rem;
		font-size: 16px;
		line-height: 1.7;
	}

	article :global(p),
	article :global(h2) {
		margin-bottom: 1rem;
	}

	article :global(h3) {
		margin-bottom: 0.5rem;
	}

	article :global(a) {
		color: var(--magic-potion);
		cursor: pointer;
		text-decoration: none;
		outline: 0;
	}

	article :global(a:hover) {
		color: var(--jacarta);
	}

	article :global(ul) {
		padding-left: 1.1rem;
		line-height: 1.7rem;
	}
</style>
