<script lang="ts">
  import Fa from 'svelte-fa'
  import {faPlus} from '@fortawesome/free-solid-svg-icons'
  import PatientRow from './PatientRow/index.svelte'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  const patientsPromise = fetch('/api/patients').then<readonly Patient[]>(
    response => response.json()
  )
  let newPatients: readonly Patient[] = []
</script>

<svelte:head>
  <title>Palet Town Hopsital</title>
</svelte:head>

<main>
  <h1>Palet Town Hopsital</h1>
  {#await patientsPromise then patients}
    <table class="patients">
      <tr>
        <th>Urgency</th>
        <th>Name</th>
        <th>Injury</th>
        <th>Age</th>
        <th>Gender</th>
        <th>Height</th>
        <th>Weight</th>
        <th>Phone Number</th>
        <th>Email</th>
        <th>Address</th>
      </tr>
      {#each patients as patient}
        <PatientRow
          {patient}
          remove={() =>
            (patients = patients.filter(({_id}) => _id !== patient._id))}
        />
      {/each}
      <tr><td><button><Fa icon={faPlus} /></button></td></tr>
    </table>
  {:catch error}
    <p>
      Oh no! Something went wrong!
      <br />
      {error instanceof Error ? error.message : String(error)}
    </p>
  {/await}
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

  .patients {
    display: table;
    padding: 0.5em;
    border: 1px solid #222;
    /* border-radius: 10px; */
    /* box-shadow: 0px 2px 5px rgba(0, 0, 0, .1); */
    border-collapse: collapse;
  }

  .patients :global(tr > *) {
    padding: 0.5em;
    white-space: nowrap;
  }
</style>
