<script lang="ts">
  import Fa from 'svelte-fa'
  import {faPlus} from '@fortawesome/free-solid-svg-icons'
  import AddRow from './PatientRow/AddRow.svelte'
  import PatientRow from './PatientRow/index.svelte'
  import {defaultPatient} from './util'
  import type {Patient, PatientWithoutId} from '@nurse-joy-hackathon/shared'

  const patientsPromise = fetch('/api/patients').then<readonly Patient[]>(
    response => response.json()
  )
  let newPatients: readonly PatientWithoutId[] = []

  const removeNewPatient = (i: number): void => {
    newPatients = newPatients.filter((_, j) => j !== i)
  }
</script>

<svelte:head>
  <title>Palet Town Hopsital</title>
</svelte:head>

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
    {#each [...newPatients.entries()] as [i, patient]}
      <AddRow
        {patient}
        cancel={() => removeNewPatient(i)}
        stopEditing={newPatient => {
          removeNewPatient(i)
          patients = [...patients, newPatient]
        }}
      />
    {/each}
    <tr
      ><td
        ><button
          on:click={() => (newPatients = [...newPatients, defaultPatient])}
          ><Fa icon={faPlus} /></button
        ></td
      ></tr
    >
  </table>
{:catch error}
  <p>
    Oh no! Something went wrong!
    <br />
    {error instanceof Error ? error.message : String(error)}
  </p>
{/await}

<style>
  .patients {
    display: table;
    padding: 0.5em;
    border: 1px solid #222;
    border-collapse: collapse;
  }

  .patients :global(tr > *) {
    padding: 0.5em;
    white-space: nowrap;
  }
</style>
