<script lang="ts">
	import ProjectCard from '$lib/ProjectCard.svelte';
	import { featuredProjects } from '$lib/projects';

	const contactUrl = 'https://contact.nickesselman.nl/?from=projects';
</script>

<div class="site-shell">
	<header class="topbar">
		<a href="/" class="brand">stupid projects</a>

		<nav aria-label="Primary">
			<a href={contactUrl} target="_blank" rel="noreferrer">contact</a>
		</nav>
	</header>

	<main class="site-main">
		<header class="page-header">
			<h1>stupid projects</h1>
		</header>

		<section class="project-grid" aria-label="Projects">
			{#each featuredProjects as project}
				<ProjectCard {project} />
			{/each}
		</section>
	</main>
</div>

<style>
	.topbar {
		position: sticky;
		top: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		max-width: calc(var(--max-width) + 3rem);
		margin: 0 auto;
		padding: 1rem 1.5rem;
		background: linear-gradient(180deg, rgba(3, 5, 4, 0.92), rgba(3, 5, 4, 0.64), transparent);
		backdrop-filter: blur(10px);
	}

	.brand {
		font-family: 'Silkscreen', monospace;
		font-size: 0.95rem;
		letter-spacing: 0.04em;
		text-transform: lowercase;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	nav a {
		padding: 0.58rem 0.9rem;
		border: 1px solid transparent;
		border-radius: 999px;
		color: var(--text-muted);
		font-size: 0.92rem;
		transition:
			border-color 180ms ease,
			color 180ms ease,
			background-color 180ms ease;
	}

	nav a:hover {
		border-color: rgba(125, 255, 156, 0.18);
		background: rgba(117, 255, 147, 0.06);
		color: var(--text);
	}

	.site-main {
		max-width: var(--max-width);
		margin: 0 auto;
		padding: 1rem 1.5rem 5rem;
	}

	.page-header {
		padding: clamp(1.2rem, 2vw, 1.8rem) 0 1.1rem;
	}

	h1 {
		margin: 0;
		font-family: 'Silkscreen', monospace;
		font-size: clamp(1.8rem, 1.2rem + 2vw, 3rem);
		line-height: 1.1;
		letter-spacing: 0.02em;
		text-transform: lowercase;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	@media (max-width: 980px) {
		.project-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 760px) {
		.topbar {
			padding-inline: 1rem;
		}

		.topbar,
		.site-main {
			max-width: 100%;
		}

		.site-main {
			padding: 0.7rem 1rem 4rem;
		}
	}
</style>
