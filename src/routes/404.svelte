<script>
  import { goto } from "@sapper/app";

  import Button from "../components/button.svelte";

  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>Daniel Dias | Page Not Found</title>
</svelte:head>

<div class="error-wrapper">
  <h1>4<span><i class="fas fa-ghost" /></span>4</h1>
  <h2 class="is-bold">Page Not Found</h2>

  <p class="is-bold">It looks like nothing was found at this location.</p>

  <Button text="Go to Home Page" on:click={(e) => goto("/")} />
</div>

<style>
  .error-wrapper {
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-color: var(--deep-blue);
  }

  * {
    color: white;
  }

  p,
  h2 {
    margin-top: 20px;
  }

  p {
    color: #ccc;
    margin-bottom: 35px;
    font-size: 16px;
  }

  h1 {
    font-size: 12.5rem;
    letter-spacing: 0.1em;
    margin: 0.025em 0;
    text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
    white-space: nowrap;
  }

  h2 {
    font-size: 2.5rem;
  }

  @keyframes spooky {
    from {
      transform: translatey(0.15em) scaley(0.95);
    }

    to {
      transform: translatey(-0.15em);
    }
  }

  h1 > span:hover * {
    color: var(--yellow);
  }
  h1 > span {
    animation: spooky 2s alternate infinite linear;
    display: inline-block;
    text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
    filter: drop-shadow(0.05em 0.05em 0 rgba(0, 0, 0, 0.25));
    margin-right: 0.1em;
  }

  h1 > span * {
    color: var(--blue);
  }

  @media (max-width: 900px) {
    h1 {
      font-size: 8.5rem;
    }
  }
  span {
    margin-top: 0.5em;
  }
</style>
