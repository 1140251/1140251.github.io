<script lang="ts">
	import { selectedTab } from '../stores/stores';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import menu from '../data/menu.json';

	let activeMenu = false;

	const selectTab = (tab, e) => {
		e.preventDefault();
		selectedTab.set(tab);
		activeMenu = false;
		goto('/' + (tab !== 'home' ? tab : ''));
	};
	let tabs = menu.map((tab) => {
		return tab.link;
	});

	if (typeof window !== 'undefined' && typeof document !== 'undefined') {
		page.subscribe(async ({ path, params, query }) => {
			if (path !== '/' && tabs.includes(path.substr(1))) {
				selectedTab.set($page.path.substr(1));
			} else {
				selectedTab.set('home');
			}
		});
	}
</script>

<header id="header-mobile" class="is-hidden-desktop">
	<div class="fixed">
		<a
			href="/"
			class=" is-hidden-desktop"
			on:click={(e) => {
				e.preventDefault();
				activeMenu = !activeMenu;
			}}
		>
			<div class="menu-icon-wrapper" style="visibility: visible;" class:open={activeMenu}>
				<svg width="1000px" height="1000px">
					<path
						class="path1"
						d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1
    200 200 L 800 800"
					/>
					<path class="path2" d="M 300 500 L 700 500" />
					<path
						class="path3"
						d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1
    200 800 L 800 200"
					/>
				</svg>
			</div>
		</a>
		<a href="/" class=" title is-bold"
			>Daniel Dias<span
				style="color: var(--magic-potion); font-size: 3rem; 
    margin-bottom: 1rem;">.</span
			></a
		>
	</div>

	<nav class="navbar navbar-menu is-static" class:is-active={activeMenu} id="navbar-menu">
		{#each menu as item}
			<a
				href={`/${item.link}`}
				class:active={$selectedTab === item.link}
				on:click={(e) => selectTab(item.link, e)}
				class="navbar-item is-bold is-secondary"
			>
				<i class={`icon icon-${item.icon}`} />
				{item.text}
			</a>
		{/each}
	</nav>
</header>

<header id="header-desktop" class="is-hidden-mobile">
	<div class="header-logo">
		<a href="/" class="title is-bold"
			>Daniel Dias<span style="color: var(--magic-potion); font-size: 3rem;">.</span></a
		>
		<a href="/" class="subtitle not-spaced is-muted"> Software Engineer</a>
	</div>

	<div class="nav-container">
		<nav class="navbar">
			<div id="navbar-menu" class="navbar-menu is-static">
				{#each menu as item}
					<a
						href={`/${item.link}`}
						class:active={$selectedTab === item.link}
						on:click={(e) => selectTab(item.link, e)}
						class="navbar-item is-bold is-secondary"
					>
						<i class={`icon icon-${item.icon}`} />
						{item.text}
					</a>
				{/each}
			</div>
		</nav>
	</div>

	<div class="footer">
		<div class="copyright">
			&copy; {new Date().getFullYear()}, Daniel Dias
		</div>
	</div>
</header>

<style>
	.icon {
		margin-right: 10px;
		font-size: 16px;
		color: var(--yellow);
	}

	.copyright {
		color: #9c9ab3;
		font-size: 14px;
		padding-left: 30px;
	}

	.footer {
		display: flex;
		align-content: space-between;
		flex-direction: column;
		margin-top: auto;
		margin-bottom: 15px;
	}

	#header-mobile .fixed {
		display: flex;
		flex-direction: row;
		flex-shrink: 0;
		gap: 1rem;
		align-items: center;
	}

	#header-mobile {
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		gap: 0.5rem;
		padding: 0px 15px;
		border-bottom: solid 1px rgba(255, 255, 255, 0.1);
	}

	#header-mobile .title {
		display: flex;
		align-items: center;
	}
	#header-desktop,
	#header-mobile {
		background-color: var(--deep-blue);
	}

	#header-desktop {
		position: fixed;
		top: 0;
		left: 0;
		width: 18vw;
		min-width: 260px;
		height: 100vh;
		min-height: 100vh;
		background-color: var(--deep-blue);
		border-right: solid 1px rgba(255, 255, 255, 0.1);
		box-shadow: 15px rgb(0 0 0 / 5%);
		z-index: 1;
		display: flex;
		flex-direction: column;
	}

	.nav-container {
		padding: 0px 0 40px;
		flex-grow: 1;
		position: relative;
		width: auto;
	}

	.navbar {
		width: 100%;
		min-height: 3.8rem;
		padding: 0 20px;
	}

	@media screen and (min-width: 1024px) {
		.navbar,
		.navbar-menu {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-direction: column;
		}
	}

	@media screen and (max-width: 1023px) {
		.navbar-menu.is-active {
			display: flex;
			flex-direction: column;
			visibility: visible;
			align-items: center;
		}

		.navbar-menu {
			display: none;
			visibility: hidden;
		}
	}

	.navbar .navbar-menu .navbar-item {
		text-align: center !important;
	}

	.navbar .navbar-item {
		font-family: 'Rubik', sans-serif;
		color: white;
		cursor: pointer;
		font-size: 18px;
	}

	.navbar-item {
		display: block;
		flex-grow: 0;
		flex-shrink: 0;
		line-height: 1.5;
		padding: 1.2rem 0.75rem;
		position: relative;
	}

	.navbar .navbar-menu .navbar-item {
		text-align: center !important;
	}

	@media screen and (min-width: 1024px) {
		.is-hidden-desktop {
			display: none !important;
			visibility: hidden !important;
		}
	}

	@media screen and (max-width: 1024px) {
		.is-hidden-mobile {
			display: none !important;
			visibility: hidden !important;
		}
	}

	.menu-icon-wrapper {
		position: relative;
		left: 0;
		top: 0;
		width: 34px;
		height: 34px;
		pointer-events: none;
		transition: 0.1s;
	}

	a {
		cursor: pointer;
		text-decoration: none;
	}

	.menu-icon-wrapper svg {
		position: absolute;
		top: -18px;
		left: -18px;
		transform: scale(0.07);
		transform-origin: 0 0;
	}

	.menu-icon-wrapper svg path {
		stroke: var(--magic-potion);
		stroke-width: 40px;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: transparent;
		transition: stroke-dasharray 0.5s;
	}

	.menu-icon-wrapper svg path.path1 {
		stroke-dashoffset: 5803.15px;
		stroke-dasharray: 2901.57px, 2981.57px, 240px;
	}

	.menu-icon-wrapper svg path.path2 {
		stroke-dashoffset: 800px;
		stroke-dasharray: 400px, 480px, 240px;
	}

	.menu-icon-wrapper svg path.path3 {
		stroke-dashoffset: 6993.11px;
		stroke-dasharray: 3496.56px, 3576.56px, 240px;
	}

	.menu-icon-wrapper.open svg path.path1 {
		stroke-dasharray: 2901.57px, 5258.15px, 240px;
	}

	.menu-icon-wrapper.open svg path.path2 {
		stroke-dasharray: 400px, 600px, 0px;
	}

	.menu-icon-wrapper.open svg path.path3 {
		stroke-dasharray: 3496.56px, 6448.11px, 240px;
	}

	.header-logo {
		color: white;
		padding-left: 30px;
		align-items: baseline;
		margin-bottom: 10vh;
		display: flex;
		flex-direction: column;
		padding-top: 40px;
	}

	.title {
		color: white;
	}

	.navbar .navbar-item.active {
		color: var(--yellow);
	}

	.navbar .navbar-item:not(.active):hover:after {
		content: '';
		background: var(--magic-potion);

		height: 2px;
		display: block;
		width: 1.5em;
		transition: width 0.4s;
	}
</style>
