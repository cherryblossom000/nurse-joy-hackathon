<script lang="ts">
  import {Gender} from '../../shared'
  import PatientView from './PatientView.svelte'
  import type {Patient} from '../../shared'

  const patients: readonly Patient[] = [
    {
      name: 'Jane Smith',
      age: 16,
      height: 160,
      weight: 60,
      gender: Gender.Female,
      phoneNumber: '0412345678',
      address: '1 Something St, Suburb, VIC 1234 Australia',
      email: 'jane.smith@mail.com',
      injuryType: 'Injury type 1',
      urgency: 1
    },
    {
      name: 'Jane Doe',
      age: 25,
      height: 160,
      weight: 60,
      gender: Gender.Male,
      phoneNumber: '02135164363',
      address: '1 Abc St, Def, VIC 1234 Australia',
      email: 'jane.smith@mail.com',
      injuryType: 'Injury type 2',
      urgency: 2
    }
  ]
</script>

<svelte:head>
  <title>Palet Town Hopsital</title>
</svelte:head>

<main>
  <h1>Palet Town Hopsital</h1>
  <div class="patients">
    {#each patients as patient}
      <PatientView {patient} />
    {/each}
  </div>
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
    display: grid;
  }
</style>
