<script lang="ts">
  import Patients from './Patients.svelte'
</script>

<svelte:head>
  <title>Palet Town Hopsital</title>
</svelte:head>

<main>
  <h1>Palet Town Hopsital</h1>
  <Patients />
</main>

<style>
  @import 'normalize.css';
  @import '@fontsource/inter';

  :root {
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    padding: 1rem;
  }
</style>
