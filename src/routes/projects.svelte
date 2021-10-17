<script>
  import projects from "../data/projects.json";
  import TagFilter from "../components/tagFilter.svelte";
  const tags = [
    { filter: "all", text: "All" },
    { filter: "professional", text: "Professional" },
    { filter: "academic", text: "Academic" },
    { filter: "hobby", text: "Hobby" },
  ];
</script>

<svelte:head>
  <title>Daniel Dias | Projects</title>
</svelte:head>

<div class="wrapper">
  <div class="container">
    <h2 class="section-title">Projects</h2>
    <div class="projects-container">
      <TagFilter {tags} />
      <ul class="projects-wrapper">
        {#each projects as project}
          <li class="card" data-category={project.categories.join(", ")}>
            <div class="image">
              <div class="image-container" style="padding-bottom: 51.8171%;">
                <a target="_blank" class="no-link" href={project.homePage}>
                  <img
                    class="lazy-image full"
                    alt=""
                    src={project.thumb ? project.thumb : ""}
                  /></a
                >
              </div>
            </div>
            <div class="text">
              <p class="title">{project.title}</p>
              <p class="subtitle is-muted">
                {`${project.start} - ${project.end}`}
              </p>

              <div class="link" title={`Open project for ${project.title}`}>
                {#if project.homePage}
                  <a target="_blank" class="no-link" href={project.homePage}
                    >Read More <i
                      class="icon fa fa-fw fa-arrow-circle-right"
                    /></a
                  >
                {:else}
                  <a class="no-link" href="javascript:void(0)"
                    >In development!</a
                  >
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>

<style>
  .title {
    margin: 0 0 0.5rem;
  }

  .projects-wrapper .title {
    text-align: left;
  }

  .subtitle {
    font-size: 14px;
    margin: 0 !important;
  }

  .projects-wrapper .card {
    padding: 0px 20px;
    height: max-content;
  }

  .projects-wrapper {
    margin: 40px 0 15px 0;
    list-style: none;
    padding: 0;
    grid-auto-rows: 1fr;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 50px 20px;
  }

  .card .image {
    position: relative;
    top: -1.1em;
    left: 50%;
    transform: translateX(-50%);
  }

  .image-container {
    position: relative;
    overflow: hidden;
    background: white;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    display: block;
    width: 100%;
    border-radius: 12px;
  }

  .image-container .lazy-image {
    position: absolute;
    width: 100%;
    transition: all 0.2s ease-in-out;
  }

  .image-container .lazy-image:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (min-width: 1200px) {
    .projects-wrapper {
      margin: 40px 0 20px 0;
      grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
    }
  }

  .card .text {
    margin: 10px;
    position: relative;
  }

  .subtitle {
    color: #888;
  }

  .card .text .title {
    font-weight: 700;
    font-size: 20px;
    color: var(--american-blue);
  }

  .card .link {
    margin-top: auto;
    display: flex;

    align-items: center;
  }
</style>
