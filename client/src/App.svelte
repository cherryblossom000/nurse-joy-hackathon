<script lang="ts">
  import {Gender} from '../../shared'
  import PatientRow from './PatientRow.svelte'
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
      name: 'John Doe',
      age: 25,
      height: 178,
      weight: 82,
      gender: Gender.Male,
      phoneNumber: '0213516436',
      address: '1 Abc St, Def, VIC 1234 Australia',
      email: 'john.doe@mail.com',
      injuryType: 'Injury type 2',
      urgency: 2
    },
    {
      name: 'First Last',
      age: 42,
      height: 170,
      weight: 79,
      gender: Gender.Other,
      phoneNumber: '0235729573',
      address: '20 SAfd Ln, Saregdf, VIC 3246 Australia',
      email: 'first.last@mail.com',
      injuryType: 'COVID-19',
      urgency: 3
    }
  ]
</script>

<svelte:head>
  <title>Palet Town Hopsital</title>
</svelte:head>

<main>
  <h1>Palet Town Hopsital</h1>
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
      <PatientRow {patient} />
    {/each}
  </table>
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
    padding: .5em;
    border: 1px solid #222;
    /* border-radius: 10px; */
    /* box-shadow: 0px 2px 5px rgba(0, 0, 0, .1); */
    border-collapse: collapse;
  }

  :global(th), :global(td) {
    padding: .5em;
    white-space: nowrap;
  }
</style>
