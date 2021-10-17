<script>
  export let author,
    date,
    readingTime,
    hideAuthor = false;
</script>

<h6>
  {#if !hideAuthor}
    {"By"}
    <a href={`/blog?author=${author || "Daniel Dias"}`}
      >{author || "Daniel Dias"}</a
    > •
  {/if}{`${date}  •  ${readingTime}`}
</h6>

<style>
  h6 {
    color: var(--cool-grey);
    margin: 0.5rem 0 5px 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.7;
  }

  h6 a {
    color: var(--jacarta);
    cursor: pointer;
    outline: 0;
    text-decoration: none;
  }

  h6 a:hover {
    color: var(--magic-potion);
  }
</style>
