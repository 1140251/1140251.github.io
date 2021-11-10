<script context="module">
  export function preload({ params, query }) {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((data) => {
        if (query) {
          if (query.s) {
            let searchQuery = query.s.toLowerCase();
            data.posts = data.posts.filter(
              (post) =>
                post.title.toLowerCase().includes(searchQuery) ||
                post.description.toLowerCase().includes(searchQuery) ||
                post.tags.includes(searchQuery)
            );
          }
          if (query.tag) {
            data.posts = data.posts.filter((post) =>
              post.tags.includes(query.tag)
            );
          }
        }
        return {
          posts: data.posts,
          tags: data.tags,
          search: query.s,
          tag: query.tag,
        };
      });
  }
</script>

<script>
  import { goto } from "@sapper/app";
  import PostInfo from "../../components/post-info.svelte";
  import Search from "../../components/search.svelte";
  import Tags from "../../components/tags.svelte";

  export let posts, tags, search, tag;
</script>

<div class="container ">
  <div class="wrapper">
    <div class="section-title">
      <h2>Blog Posts</h2>
      {#if search || tag}
        <h3>Search Results for: {search || tag}</h3>
      {/if}
    </div>
    <div class="row">
      <div class="blog-list">
        {#each posts as post}
          <div on:click={() => goto(`/blog/${post.slug}`)} class="post">
            <h2 class="post-title">{post.title}</h2>
            <PostInfo
              author={post.author}
              date={post.date}
              readingTime={post.printReadingTime}
              hideAuthor
            />
            <p class="post-description">{post.description}</p>
          </div>
        {/each}
      </div>
      <div class="sidebar">
        <Search />
        <Tags {tags} />
      </div>
    </div>
  </div>
</div>

<style>
  .wrapper {
    margin-bottom: 2rem;
  }

  .section-title h3 {
    margin-top: 1rem;
    color: var(--dark-blue);
    font-size: 18px;
  }

  .row {
    flex-direction: row;
    gap: 30px;
  }

  .sidebar {
    flex: 1;
  }

  .blog-list {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
    flex: 2;
  }

  .post {
    cursor: pointer;
    background: white;
    box-shadow: 0 0 20px rgb(0 0 0 / 20%);
    box-sizing: border-box;
    display: block;
    width: 100%;
    max-width: 95%;
    padding: 30px 25px 15px;
    border-radius: 15px !important;
  }

  .post:hover {
    text-decoration: none;
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
  }

  .post:hover .post-title {
    color: var(--magic-potion);
  }

  .post-title {
    font-weight: 700;
    font-size: 26px;
    color: var(--american-blue);
    margin-bottom: 10px;
  }

  .post-description {
    color: var(--dark-blue);
    line-height: 26px;
  }
</style>
