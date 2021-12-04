<script lang="ts">
	import { fade } from 'svelte/transition';

	let images: any[] = [
		{ src: 'javascript.svg', speed: -5, left: 10, top: 10 },
		{ src: 'html5.svg', speed: 5, left: 25, top: 30 },
		{ src: 'triangle.svg', speed: 3, left: 25, top: 70 },
		{ src: 'tablet.svg', speed: 7, left: 10, top: 85 },
		{ src: 'mouse-svgrepo-com.svg', speed: 2, left: 65, top: 10 },
		{ src: 'headphones.svg', speed: 2, left: 85, top: 87 },
		{ src: 'mouse-svgrepo-com.svg', speed: 1, left: 40, top: 85 },
		{ src: 'bug.svg', speed: -7, left: 90, top: 35 },
		{ src: 'css3.svg', speed: -5, left: 70, top: 70 },
		{ src: 'code.svg', speed: 5, left: 90, top: 10 },
		{ src: 'code.svg', speed: 5, left: 10, top: 50 },
		{ src: 'global-svgrepo-com.svg', speed: 5, left: 37, top: 15 },
		{ src: 'circle.svg', speed: 5, left: 63, top: 45 }
	];

	function parallax(e) {
		for (let index = 0; index < images.length; index++) {
			images[index].x = (e.pageX * images[index].speed) / 250;
			images[index].y = (e.pageY * images[index].speed) / 250;
		}
	}

	let text = 'Software Engineer';
	setInterval(() => {
		text = text == 'Software Engineer' ? 'Full Stack Developer' : 'Software Engineer';
	}, 5000);
</script>

<svelte:head>
	<title>Daniel Dias | Personal Website</title>
</svelte:head>

<div class="wrapper is-centered" on:mousemove={parallax}>
	<div class="container">
		<img id="developer-head" src="images/developer-head.svg" alt="" />
		<h1 class="title is-bold not-spaced">Daniel Dias</h1>
		{#key text}
			<h2 in:fade={{ duration: 2000 }} class="subtitle not-spaced">{text}</h2>
		{/key}
		<div class="links">
			<a class="no-link" target="_blank" href="https://github.com/1140251">
				<i class="fab fa-github" title="GitHub" />
			</a>
			<a class="no-link" target="_blank" href="https://www.linkedin.com/in/daniel-maia-dias/">
				<i class="fab fa-linkedin" title="LinkedIn" />
			</a>
			<a
				class="no-link"
				target="_blank"
				href="mailt&#111;&#58;&#37;64a&#110;%69%&#54;5&#108;%&#55;2&#109;di%61&#115;&#64;&#104;%6&#70;t&#37;6Da&#105;&#37;6C&#46;co&#109;"
			>
				<i class="fas fa-envelope-square" title="Email" />
			</a>
			<a href="https://dev.to/1140251" target="_blank">
				<i class="fab fa-dev" title="DEV Profile" />
			</a>
		</div>
	</div>
	{#each images as image}
		<img
			src={'images/background/' + image.src}
			alt=""
			class="background"
			data-speed={image.speed}
			style={`transform: translateX(${image.x ? image.x : 0}px) translateY(${
				image.y ? image.y : 0
			}px); left:${image.left}%; top:${image.top}%;`}
		/>
	{/each}
</div>

<a href="/404" style="visibility:hidden" />

<style>
	.background {
		z-index: -1;
	}

	@media screen and (max-width: 600px) {
		.background {
			display: none;
		}
	}

	.links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-size: 1.25em;
		margin-top: 1rem;
		line-height: 0.75em;
	}

	.links a {
		color: white !important;
	}

	.links a:hover {
		color: var(--yellow) !important;
	}
	#developer-head {
		width: 100px;
		border-radius: 50%;
		padding: 5px;
		background-color: var(--yellow);
	}

	.wrapper {
		z-index: 2;
		align-items: center;
		position: relative;
		justify-content: center;
		display: flex;
		width: 100%;
		overflow: hidden;
		background-color: var(--deep-blue);
		height: 100vh;
	}

	.wrapper > img {
		position: absolute;
		width: 40px;
		height: 40px;
		opacity: 1;
		object-fit: cover;
		stroke: #3c7bf4;
		stroke-width: 8;
		overflow: visible;
	}

	.title {
		margin: 0.5em;
	}
</style>
