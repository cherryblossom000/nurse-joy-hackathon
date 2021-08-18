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
    --foreground: #222;
    color: var(--foreground);
  }

  main {
    padding: 1rem;
  }

  :global(input) {
    width: 5em;
  }

  :global(button) {
    border: none;
    border-radius: 3px;
    padding: 0.3em;
    width: 2em;
    height: 2em;
    cursor: pointer;
  }

  :global(input, select, textarea) {
    border: 1px solid #8f8f8f;
    border-radius: 3px;
  }
</style>
