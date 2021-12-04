<script lang="ts">
	export let tags;
</script>

<div class="widget">
	<h3>Tags</h3>
	<ul>
		{#each tags.sort() as tag}
			<li>
				<a href={`/blog?tag=${tag}`}>{tag}</a>
			</li>
		{/each}
	</ul>
</div>
