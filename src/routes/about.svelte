<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load() {
		const modules = import.meta.glob('/blog/*.md');
		return {
			props: {
				postsLength: modules && Object.entries(modules) ? modules.length : 0
			}
		};
	}
</script>

<script lang="ts">
	import Button from '../components/button.svelte';
	import projects from '../data/projects.json';
	import { onMount } from 'svelte';
	import Modal from '../components/modal.svelte';

	let selectedPanel = 'basic-content';

	let showModal = false;

	export let postsLength = 0;

	onMount(() => {
		const counters = document.querySelectorAll('.count');
		const speed = 600; // The lower the slower

		counters.forEach((counter) => {
			const updateCount = () => {
				const target = +counter.getAttribute('data-target');
				const count = +(counter as HTMLElement).innerText;

				// Lower inc to slow and higher to slow
				const inc = Math.ceil(target / speed);

				// Check if target is reached
				if (count <= target) {
					// Add inc to count and output in counter
					(counter as HTMLElement).innerText = String(count + inc);
					// Call function every ms
					setTimeout(updateCount, 1);
				} else {
					(counter as HTMLElement).innerText = String(target);
				}
			};

			updateCount();
		});
	});

	function changeDialog(card) {
		selectedPanel = card;
	}

	function scale(node, { duration }) {
		return {
			duration,
			css: (t) => {
				return `transform: scale(${t});`;
			}
		};
	}
</script>

<div class="wrapper">
	<div class="container">
		<h2 class="section-title">About Me</h2>

		<div>
			<div class="about columns">
				<div class="image">
					<img
						id="developer"
						on:click={() => changeDialog('basic-content')}
						src="images/developer.svg"
						alt=""
					/>
				</div>
				{#key selectedPanel}
					<div class="column bubble" in:scale={{ duration: 1000 }}>
						<div class="wrapper-info">
							<div id="basic-content">
								<p style="text-align: justify;">
									Hi, I'm Daniel Dias, a Software Developer from Porto, Portugal, with a diploma of
									merit in Software Engineering Master's degree. <br /> I have a huge passion for software
									development, either in Web, Mobile or Desktop development. In my free time, I try to
									explore new things in Software and work on side projects. Some technologies I enjoy
									working with are Javascript/Typescript, Golang and Python.
								</p>
								<div class="info-footer">
									<Button text="Download CV" on:click={() => (showModal = true)} />
									<ul class="links fa-ul">
										<li>
											<a class="no-link" target="_blank" href="https://github.com/1140251">
												<i class="fab fa-github" title="GitHub" /> GitHub
											</a>
										</li>
										<li>
											<a
												class="no-link"
												target="_blank"
												href="https://www.linkedin.com/in/daniel-maia-dias/"
											>
												<i class="fab fa-linkedin" title="LinkedIn" /> LinkedIn
											</a>
										</li>
										<li>
											<a
												class="no-link"
												target="_blank"
												href="mailt&#111;&#58;&#37;64a&#110;%69%&#54;5&#108;%&#55;2&#109;di%61&#115;&#64;&#104;%6&#70;t&#37;6Da&#105;&#37;6C&#46;co&#109;"
											>
												<i class="fas fa-envelope-square" title="Email" /> Email
											</a>
										</li>
										<li>
											<a href="https://dev.to/1140251" class="no-link" target="_blank">
												<i class="fab fa-dev" title="DEV Profile" /> DEV
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				{/key}
			</div>
			<div class="content-selection">
				<div class="fact-item">
					<i class="icon icon-folder-alt" />
					<div class="details">
						<h3 class="mb-0 mt-0 number">
							<em class="count" data-target={projects.length}>0</em>
						</h3>
						<p class="mb-0">Projects</p>
					</div>
				</div>

				<div class="fact-item">
					<i class="icon icon-cup" />
					<div class="details">
						<h3 class="mb-0 mt-0 number">
							<em
								class="count"
								data-target={Math.ceil(
									(new Date().getTime() - new Date('12/10/2017').getTime()) / (1000 * 3600 * 24)
								)}>0</em
							>
						</h3>
						<p class="mb-0">Cups of coffee</p>
					</div>
				</div>

				<div class="fact-item">
					<i class="icon icon-note" />
					<div class="details">
						<h3 class="mb-0 mt-0 number">
							<em class="count" data-target={postsLength}>0</em>
						</h3>
						<p class="mb-0">Posts</p>
					</div>
				</div>

				<div class="fact-item">
					<i class="icon icon-badge" />
					<div class="details">
						<h3 class="mb-0 mt-0 number">
							<em class="count" data-target={1}>0</em>
						</h3>
						<p class="mb-0">Award</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showModal}
	<Modal on:close={() => (showModal = false)}>
		<div slot="body" class="body">
			<p>
				To contact me please fill the <a class="no-link" href="/contact">contact form</a>
				or send me an
				<a
					class="no-link"
					target="_blank"
					href="mailt&#111;&#58;&#37;64a&#110;%69%&#54;5&#108;%&#55;2&#109;di%61&#115;&#64;&#104;%6&#70;t&#37;6Da&#105;&#37;6C&#46;co&#109;"
					>email</a
				>.
			</p>

			<a class="no-link" href="/resume.pdf" download>Download CV</a>
		</div>
	</Modal>
{/if}

<style>
	.body .no-link {
		color: var(--magic-potion);
	}

	.body {
		color: var(--dark-blue);
	}

	.body p {
		margin-bottom: 1rem;
	}

	.section-title {
		margin-bottom: 60px;
	}

	.info-footer {
		display: flex;
		justify-content: space-between;
		gap: 5px;
	}

	.links {
		font-size: 1em;
		display: flex;
		flex-direction: row;
		align-items: baseline;
		justify-content: center;
		width: auto;
		align-self: center;
		align-content: center;
		gap: 10px;
		margin-left: 0;
	}

	.links a {
		color: var(--american-blue) !important;
		display: inline-flex;
		align-content: center;
		align-items: center;
		gap: 5px;
	}

	@media screen and (max-width: 1050px) {
		.links a {
			text-indent: -9999px;
		}
	}

	.links a:hover {
		color: var(--magic-potion) !important;
	}

	.columns {
		display: flex;
		margin: 0 10px;
	}

	.container > div {
		margin-bottom: 15px;
	}

	.content-selection {
		margin-top: 70px;
		justify-content: space-around;
		flex-wrap: wrap;
		display: flex;
	}

	@media screen and (max-width: 900px) {
		.content-selection {
			justify-content: space-between;
			gap: 10px;
		}

		.fact-item {
			max-width: 40%;
		}
	}

	.bubble {
		position: relative;
		width: 100%;
		padding-left: 15px;

		flex: 0 0 75%;
		max-width: 75%;
	}

	.wrapper-info {
		margin-left: 60px;
		padding: 30px;
		-webkit-box-shadow: 0px 5px 20px 0px rgb(69 67 96 / 10%);
		box-shadow: 0px 5px 20px 0px rgb(69 67 96 / 10%);
		background: white;
		border-radius: 20px !important;
		color: var(--dark-blue);
		font-size: 17px;
	}

	.wrapper-info:before {
		content: '';
		width: 0;
		height: 0;
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
		border-right: 15px solid #fff;
		position: absolute;
		left: 60px;
		top: 20%;
		color: var(--dark-blue);
		font-size: 17px;
	}

	.wrapper-info p {
		text-align: left;
		margin-bottom: 1.5em;
	}

	.image {
		display: block;
		position: relative;
	}

	#developer {
		cursor: pointer;
	}

	.image img {
		display: block;
		height: auto;
		max-width: 250px;
		width: 100%;
		margin: 0 auto;
	}

	.fact-item {
		padding-right: 15px;
		padding-left: 15px;
	}

	.fact-item .details {
		margin-left: 60px;
		color: var(--american-blue);
	}

	.fact-item .number {
		font-size: 34px;
	}

	.fact-item p {
		font-size: 20px;
		color: var(--dark-blue);
		line-height: 1.7;
	}

	.fact-item .icon {
		font-size: 42px;
		color: #ccc;
		float: left;
	}

	@media screen and (max-width: 769px) {
		.about {
			flex-direction: column;
			align-items: center;
		}

		.bubble {
			padding-left: 0px;
			max-width: 100%;
		}

		.wrapper-info {
			margin-left: 0;
			padding: 20px;
		}

		.wrapper-info:before {
			border: 0;
			content: none;
		}

		.fact-item .icon {
			font-size: 38px;
		}

		.fact-item .number {
			font-size: 28px;
		}
		.fact-item .details {
			margin-left: 45px;
		}
	}

	@media screen and (max-width: 370px) {
		.links {
			gap: 5px;
		}

		.info-footer :global(button) {
			font-size: 16px;
		}

		.fact-item .number {
			font-size: 26px;
		}

		.fact-item p {
			font-size: 16px;
		}
	}
</style>
