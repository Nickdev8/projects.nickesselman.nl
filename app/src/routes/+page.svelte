<script lang="ts">
	import LiveInputPanel from '$lib/LiveInputPanel.svelte';
	import ProjectCard from '$lib/ProjectCard.svelte';
	import { buildModes, featuredProjects, labNotes } from '$lib/projects';

	const playableCount = featuredProjects.filter((project) =>
		project.links.some((link) => ['Live', 'Play', 'BOM'].includes(link.label))
	).length;
</script>

<div class="site-shell">
	<header class="topbar">
		<a href="#top" class="brand">
			<span class="brand-mark"></span>
			<span class="brand-copy">
				<strong>Nick Projects</strong>
				<small>one page only</small>
			</span>
		</a>

		<nav aria-label="Primary">
			<a href="#projects">Projects</a>
			<a href="#modes">How I Build</a>
			<a href="#signal">Later</a>
		</nav>
	</header>

	<main class="site-main" id="top">
		<section class="hero">
			<div class="hero-copy panel">
				<p class="eyebrow">projects.nickesselman.nl</p>
				<h1>Projects I made.</h1>
				<p class="lede">
					Games, boards, web tools, and side quests. This page is the fast scan, not the blog
					version.
				</p>

				<div class="hero-actions">
					<a href="#projects" class="button button-primary">Open project shelf</a>
					<a href="https://github.com/Nickdev8" target="_blank" rel="noreferrer" class="button">
						GitHub
					</a>
				</div>

				<ul class="hero-stats" aria-label="Project stats">
					<li>
						<strong>{featuredProjects.length}</strong>
						<span>featured builds</span>
					</li>
					<li>
						<strong>{playableCount}</strong>
						<span>things you can click right now</span>
					</li>
					<li>
						<strong>{buildModes.length}</strong>
						<span>main build modes</span>
					</li>
					<li>
						<strong>{labNotes.length}</strong>
						<span>extra side quests in the pile</span>
					</li>
				</ul>

				<p class="hero-note">
					Contact page is not wired here yet. Later this site can point at
					<span>contact.nickesselman.nl</span>.
				</p>
			</div>

			<LiveInputPanel />
		</section>

		<section class="section-header" id="projects">
			<div class="section-copy">
				<p class="eyebrow">Project Shelf</p>
				<h2>Short cards, real links, no giant writeups</h2>
				<p>
					I pulled these from old site content plus the Hack Club project pile so this launch has
					actual projects instead of placeholder filler.
				</p>
			</div>
		</section>

		<section class="project-grid" aria-label="Featured projects">
			{#each featuredProjects as project}
				<ProjectCard {project} />
			{/each}
		</section>

		<section class="build-modes" id="modes">
			<div class="section-copy">
				<p class="eyebrow">How I Build</p>
				<h2>Mostly three modes</h2>
				<p>
					The projects jump around, but they usually land in one of these buckets.
				</p>
			</div>

			<div class="mode-grid">
				{#each buildModes as mode}
					<article class="mode-card panel">
						<h3>{mode.title}</h3>
						<p>{mode.description}</p>
						<ul>
							{#each mode.points as point}
								<li>{point}</li>
							{/each}
						</ul>
					</article>
				{/each}
			</div>
		</section>

		<section class="lab-panel panel">
			<div class="section-copy">
				<p class="eyebrow">More Side Quests</p>
				<h2>Other stuff in the Hack Club folders</h2>
				<p>
					Not everything needs a full card yet, but these are on the shelf too.
				</p>
			</div>

			<div class="lab-chip-grid" aria-label="Additional projects">
				{#each labNotes as item}
					<div class="lab-chip">
						<strong>{item.title}</strong>
						<span>{item.note}</span>
					</div>
				{/each}
			</div>
		</section>

		<section class="signal panel" id="signal">
			<div class="signal-copy">
				<p class="eyebrow">Next Module</p>
				<h2>Contact can wait.</h2>
				<p>
					For now this page stays focused on projects. When you want it, the next obvious move is
					linking out to <span>contact.nickesselman.nl</span>.
				</p>
			</div>

			<div class="signal-actions">
				<a href="https://github.com/Nickdev8" target="_blank" rel="noreferrer" class="button button-primary">
					GitHub for now
				</a>
				<span class="button button-muted button-disabled">contact.nickesselman.nl later</span>
			</div>
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
		display: inline-flex;
		align-items: center;
		gap: 0.85rem;
	}

	.brand-mark {
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 0.35rem;
		background:
			linear-gradient(180deg, rgba(117, 255, 147, 0.95), rgba(59, 230, 112, 0.8));
		box-shadow: 0 0 22px rgba(117, 255, 147, 0.35);
	}

	.brand-copy {
		display: flex;
		flex-direction: column;
	}

	.brand-copy strong {
		font-family: 'Silkscreen', monospace;
		font-size: 0.9rem;
		letter-spacing: 0.04em;
	}

	.brand-copy small {
		color: var(--text-muted);
		font-size: 0.78rem;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
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
		padding: 1.2rem 1.5rem 5rem;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
		gap: 1.2rem;
		align-items: stretch;
	}

	.hero-copy {
		padding: clamp(1.5rem, 2.4vw, 2.4rem);
	}

	h1 {
		margin: 1rem 0 0;
		font-family: 'Silkscreen', monospace;
		font-size: clamp(2.3rem, 1.45rem + 3vw, 4.8rem);
		line-height: 1.1;
		letter-spacing: 0.02em;
		text-wrap: balance;
	}

	.lede {
		max-width: 40rem;
		margin: 1rem 0 0;
		color: var(--text-muted);
		font-size: clamp(1rem, 0.94rem + 0.45vw, 1.2rem);
		line-height: 1.65;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
		margin-top: 1.8rem;
	}

	.hero-stats {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.85rem;
		margin: 1.9rem 0 0;
		padding: 0;
		list-style: none;
	}

	.hero-stats li {
		padding: 1rem 0.9rem;
		border: 1px solid rgba(125, 255, 156, 0.15);
		border-radius: 22px;
		background: rgba(117, 255, 147, 0.05);
	}

	.hero-stats strong,
	.hero-stats span {
		display: block;
	}

	.hero-stats strong {
		font-family: 'Silkscreen', monospace;
		font-size: 1.2rem;
	}

	.hero-stats span {
		margin-top: 0.45rem;
		color: var(--text-muted);
		font-size: 0.88rem;
		line-height: 1.45;
	}

	.hero-note {
		margin: 1.5rem 0 0;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.hero-note span,
	.signal-copy span {
		color: var(--accent);
	}

	.section-header,
	.build-modes {
		margin-top: 4.6rem;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.4rem;
	}

	.mode-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
		margin-top: 1.4rem;
	}

	.mode-card {
		padding: 1.4rem;
	}

	.mode-card h3,
	.mode-card p,
	.mode-card ul {
		margin: 0;
	}

	.mode-card h3 {
		font-family: 'Silkscreen', monospace;
		font-size: 1rem;
	}

	.mode-card p {
		margin-top: 0.9rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.mode-card ul {
		display: grid;
		gap: 0.7rem;
		margin-top: 1rem;
		padding: 0;
		list-style: none;
	}

	.mode-card li {
		position: relative;
		padding-left: 1.1rem;
		color: var(--text);
	}

	.mode-card li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.55rem;
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--accent);
		box-shadow: 0 0 16px rgba(117, 255, 147, 0.45);
	}

	.lab-panel,
	.signal {
		margin-top: 4.6rem;
		padding: 1.5rem;
	}

	.lab-chip-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 1.4rem;
	}

	.lab-chip {
		min-width: min(14rem, 100%);
		padding: 0.9rem 1rem;
		border: 1px solid rgba(125, 255, 156, 0.14);
		border-radius: 20px;
		background: rgba(117, 255, 147, 0.05);
	}

	.lab-chip strong,
	.lab-chip span {
		display: block;
	}

	.lab-chip strong {
		font-size: 0.95rem;
	}

	.lab-chip span {
		margin-top: 0.35rem;
		color: var(--text-muted);
		font-size: 0.86rem;
		text-transform: lowercase;
	}

	.signal {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.2rem;
	}

	.signal-copy h2,
	.signal-copy p {
		margin: 0;
	}

	.signal-copy h2 {
		margin-top: 0.9rem;
		font-family: 'Silkscreen', monospace;
		font-size: clamp(1.3rem, 1.1rem + 1vw, 2rem);
	}

	.signal-copy p {
		margin-top: 0.8rem;
		max-width: 34rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.signal-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		justify-content: flex-end;
	}

	@media (max-width: 980px) {
		.hero,
		.project-grid,
		.mode-grid,
		.signal {
			grid-template-columns: 1fr;
		}

		.signal {
			display: grid;
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

		.topbar {
			align-items: flex-start;
			flex-direction: column;
		}

		.site-main {
			padding: 0.7rem 1rem 4rem;
		}

		.hero-stats {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 560px) {
		.hero-stats {
			grid-template-columns: 1fr;
		}

		.hero-actions,
		.signal-actions {
			flex-direction: column;
		}

		.hero-actions :global(.button),
		.signal-actions :global(.button) {
			width: 100%;
		}
	}
</style>
