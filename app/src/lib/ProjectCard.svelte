<script lang="ts">
	import type { Project } from '$lib/projects';

	export let project: Project;
</script>

<article class="project-card panel" style={`--card-accent: ${project.accent};`}>
	<div class="preview" aria-hidden="true">
		<div class="preview-grid"></div>
		<div class="preview-orb"></div>
		<div class="preview-bars">
			{#each project.stack.slice(0, 4) as _, index}
				<span style={`--bar-level:${index + 1};`}></span>
			{/each}
		</div>
		<p>{project.track}</p>
	</div>

	<div class="card-copy">
		<div class="card-header">
			<p class="status">{project.status}</p>
			<h3>{project.title}</h3>
		</div>

		<p class="summary">{project.summary}</p>

		<ul class="stack-list" aria-label={`${project.title} stack`}>
			{#each project.stack as item}
				<li>{item}</li>
			{/each}
		</ul>

		<div class="links" aria-label={`${project.title} links`}>
			{#each project.links as link}
				<a href={link.href} target="_blank" rel="noreferrer" class="card-link">{link.label}</a>
			{/each}
		</div>
	</div>
</article>

<style>
	.project-card {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		padding: 1.2rem;
		border-radius: 28px;
		overflow: hidden;
	}

	.preview {
		position: relative;
		min-height: 9.5rem;
		padding: 1rem;
		border: 1px solid color-mix(in srgb, var(--card-accent) 22%, transparent);
		border-radius: 22px;
		background:
			radial-gradient(circle at 18% 28%, color-mix(in srgb, var(--card-accent) 24%, transparent), transparent 26%),
			linear-gradient(180deg, rgba(8, 19, 12, 0.95), rgba(5, 10, 7, 0.9));
		overflow: hidden;
	}

	.preview-grid {
		position: absolute;
		inset: 0;
		background-image:
			linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
			linear-gradient(180deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
		background-size: 24px 24px;
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.94), transparent);
	}

	.preview-orb {
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		width: 4.6rem;
		height: 4.6rem;
		border-radius: 22px;
		background:
			radial-gradient(circle at 38% 35%, rgba(255, 255, 255, 0.22), transparent 28%),
			var(--card-accent);
		filter: saturate(0.78);
		box-shadow:
			0 0 0 8px color-mix(in srgb, var(--card-accent) 10%, transparent),
			0 0 38px color-mix(in srgb, var(--card-accent) 24%, transparent);
	}

	.preview-bars {
		position: absolute;
		right: 1rem;
		bottom: 1.2rem;
		display: flex;
		align-items: flex-end;
		gap: 0.45rem;
		height: 4.6rem;
	}

	.preview-bars span {
		display: block;
		width: 0.72rem;
		height: calc(0.95rem + (var(--bar-level) * 0.78rem));
		border-radius: 999px 999px 0.5rem 0.5rem;
		background: color-mix(in srgb, var(--card-accent) 72%, #ffffff 10%);
		box-shadow: 0 0 18px color-mix(in srgb, var(--card-accent) 20%, transparent);
	}

	.preview p {
		position: relative;
		z-index: 1;
		margin: 0;
		font-family: 'Silkscreen', monospace;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--card-accent) 70%, #f4fff4 30%);
	}

	.card-copy {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1.2rem 0.15rem 0.15rem;
	}

	.card-header h3,
	.card-header p,
	.summary {
		margin: 0;
	}

	.status {
		color: color-mix(in srgb, var(--card-accent) 52%, #d9ffe4 48%);
		font-size: 0.82rem;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	h3 {
		margin-top: 0.4rem;
		font-family: 'Silkscreen', monospace;
		font-size: 1rem;
		line-height: 1.5;
	}

	.summary {
		color: var(--text-muted);
		line-height: 1.6;
	}

	.stack-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.55rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.stack-list li {
		padding: 0.42rem 0.7rem;
		border: 1px solid rgba(125, 255, 156, 0.14);
		border-radius: 999px;
		background: rgba(117, 255, 147, 0.06);
		color: var(--text-muted);
		font-size: 0.83rem;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: auto;
	}

	.card-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.65rem;
		padding: 0.55rem 0.95rem;
		border: 1px solid color-mix(in srgb, var(--card-accent) 24%, transparent);
		border-radius: 999px;
		background: color-mix(in srgb, var(--card-accent) 11%, transparent);
		font-size: 0.9rem;
		font-weight: 600;
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			background-color 180ms ease;
	}

	.card-link:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--card-accent) 52%, transparent);
		background: color-mix(in srgb, var(--card-accent) 18%, transparent);
	}
</style>

