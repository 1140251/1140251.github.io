<script context="module">
  export function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    return this.fetch(`blog/${params.slug}.json`)
      .then((r) => r.json())
      .then((data) => {
        return {
          post: data.post,
          recent: data.recent,
          tags: data.tags,
        };
      });
  }
</script>

<script>
  import { onMount } from "svelte";
  import { goto } from "@sapper/app";

  export let post;
  export let recent;
  export let tags;
  import PostInfo from "../../components/post-info.svelte";
  import Search from "../../components/search.svelte";
  import Tags from "../../components/tags.svelte";

  onMount(() => {
    if (!post) {
      goto("/404");
    }
  });
</script>

<svelte:head>
  {#if post}
    <title>{post.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={post.title} />
    <meta property="og:description" content={post.description} />
    <meta name="description" content={post.description} />
    <meta name="keywords" content={post.tags} />
  {/if}
</svelte:head>

{#if post}
  <div class="container">
    <div class="content">
      <div class="row">
        <div class="article-content">
          <header>
            <h1 class="post-title">{post.title}</h1>
            <PostInfo
              author={post.author}
              date={post.date}
              readingTime={post.printReadingTime}
            />
            {#if post.tags}
              <ul class="tags">
                {#each post.tags as tag}
                  <a href={`/blog?tag=${tag}`}>{tag}</a>
                {/each}
              </ul>
            {/if}
          </header>
          <article>
            {@html post.html}
          </article>
        </div>
        <div class="sidebar">
          <Search />
          <div class="widget">
            <h3>Recent Posts</h3>
            <ul>
              {#each recent as r}
                <li>
                  <a href={`/blog/${r.slug}`}>{r.title}</a>
                </li>
              {/each}
            </ul>
          </div>
          <Tags {tags} />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .content {
    padding: 50px 0 20px 0;
  }

  .row {
    flex-direction: row;
    gap: 30px;
  }

  .article-content {
    flex: 2;
    padding: 30px 25px 15px;
    background: white;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    box-sizing: border-box;
    border-radius: 15px !important;
  }

  .sidebar {
    flex: 1;
  }

  .post-title {
    font-weight: 700;
    font-size: 36px;
    color: var(--jacarta);
    line-height: 1.2;
  }

  .tags a {
    color: var(--jacarta);
    cursor: pointer;
    outline: 0;
    text-decoration: none;
  }

  .tags a:not(:last-child):after {
    content: "";
    background: var(--cool-grey);
    border-radius: 50%;
    display: inline-block;
    height: 3px;
    margin-left: 0.6rem;
    vertical-align: middle;
    width: 3px;
  }

  .tags {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
  }

  .tags a:hover {
    color: var(--magic-potion);
  }

  article {
    color: var(--dark-blue);
    margin-top: 1.5rem;
    font-size: 16px;
    line-height: 1.7;
  }

  article :global(p),
  article :global(h2) {
    margin-bottom: 1rem;
  }

  article :global(h3) {
    margin-bottom: 0.5rem;
  }

  article :global(a) {
    color: var(--magic-potion);
    cursor: pointer;
    text-decoration: none;
    outline: 0;
  }

  article :global(a:hover) {
    color: var(--jacarta);
  }

  article :global(ul) {
    padding-left: 1.1rem;
    line-height: 1.7rem;
  }
</style>
