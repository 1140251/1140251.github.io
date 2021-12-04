<script lang="ts">
	export let text = '';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button type="button" on:click={() => dispatch('click')}>{text} </button>

<style>
	button:not(:disabled):not(.disabled) {
		cursor: pointer;
	}
	button {
		color: white;
		background: var(--magic-potion);
		display: inline-block;
		vertical-align: middle;
		position: relative;
		-webkit-transform: perspective(1px) translateZ(0);
		transform: perspective(1px) translateZ(0);
		-webkit-box-shadow: 0 0 1px rgb(0 0 0 / 0%);
		box-shadow: 0 0 1px rgb(0 0 0 / 0%);
		border-radius: 30px;
		font-size: 18px;
		font-weight: 700;
		overflow: hidden;
		line-height: 1;
		padding: 12px 32px;
		text-align: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 1px solid transparent;
		padding: 0.375rem 0.75rem;
		line-height: 1.5;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		outline: 0;
	}

	button:focus {
		outline: 0;
		-webkit-box-shadow: none;
		box-shadow: none;
	}

	@-webkit-keyframes button-push {
		50% {
			-webkit-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	@keyframes button-push {
		50% {
			-webkit-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}

	button:hover {
		color: white;
		-webkit-animation-name: button-push;
		animation-name: button-push;
		-webkit-animation-duration: 0.3s;
		animation-duration: 0.3s;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		-webkit-animation-iteration-count: 1;
		animation-iteration-count: 1;
	}
</style>
