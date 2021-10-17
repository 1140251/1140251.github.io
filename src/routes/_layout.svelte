<script>
  import Nav from "../components/navbar.svelte";
  import PageTransition from "../components/pageTransition.svelte";
  import { stores } from "@sapper/app";

  const { page } = stores();
</script>

<Nav />

<main>
  <PageTransition refresh={$page.path}>
    <slot />
  </PageTransition>
</main>

<style>
  main {
    margin-left: max(260px, 15vw);
    color: white;
  }

  @media screen and (max-width: 1024px) {
    main {
      margin-left: 0;
    }
  }
</style>
