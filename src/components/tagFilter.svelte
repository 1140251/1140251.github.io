<script lang="ts">
	export let tags = [];

	let selected;

	const show = (e) => {
		selected = e.target.getAttribute('data-filter');
		const cards = document.querySelectorAll('[data-category]');

		if (cards) {
			for (let index = 0; index < cards.length; index++) {
				let attribute = cards[index].getAttribute('data-category');
				if (!attribute.includes(selected)) {
					(cards[index] as HTMLElement).style.display = 'none';
				} else {
					(cards[index] as HTMLElement).style.display = 'inline-block';
				}
			}
		}
	};
</script>

{#if tags}
	<div class="filter-wrapper">
		<div role="group" id="filter-buttons">
			{#each tags as tag}
				<button
					type="button"
					class:active={tag.filter == selected}
					data-filter={tag.filter}
					on:click={(e) => {
						show(e);
					}}>{` ${tag.text} `}</button
				>
			{/each}
		</div>
	</div>
{/if}

<style>
	#filter-buttons {
		position: relative;
		display: -ms-inline-flexbox;
		display: inline-flex;
		vertical-align: middle;
		flex-wrap: wrap;
	}
	#filter-buttons button {
		background-color: transparent;
		color: var(--dark-blue);
		font-size: 16px;
		font-weight: 700;
		transition: all 0.3s ease-out;
		padding: 5px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 1px solid transparent;
		border-radius: 25px;
		cursor: pointer;
		margin-left: -1px;
	}

	#filter-buttons button:hover {
		z-index: 1;
		color: var(--magic-potion);
		transition: all 0.3s ease-out;
		text-decoration: none;
	}

	#filter-buttons button:focus,
	#filter-buttons button.active {
		z-index: 1;
		outline: 0;
		color: var(--magic-potion);
		-webkit-appearance: none;
		transition: all 0.3s ease-out;
		text-decoration: none;
	}

	#filter-buttons button:not(:first-child) {
		margin-left: 10px;
	}
</style>
