<script lang="ts">
  import {
    deletePatient,
    formatGender,
    formatPhoneNumber,
    formatUrgency
  } from '../util'
  import Fa from 'svelte-fa'
  import {faPencilAlt, faTrash} from '@fortawesome/free-solid-svg-icons'
  import RowWrapper from './RowWrapper.svelte'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
  export let edit: () => void
  export let remove: () => void

  const removePatient = async (): Promise<void> => {
    // TODO: error handling
    await deletePatient(patient)
    remove()
  }
</script>

<RowWrapper>
  <td class="urgency urgency-{patient.urgency}"
    >{formatUrgency(patient.urgency)}</td
  >
  <td>
    {patient.name}
  </td>
  <td class="injuries">
    <ul>
      {#each patient.injuries as injury}
        <li>{injury}</li>
      {/each}
    </ul>
  </td>
  <td>
    {patient.age}
  </td>
  <td>
    {formatGender(patient.gender)}
  </td>
  <td>
    {patient.height} cm
  </td>
  <td>
    {patient.weight} kg
  </td>
  <td>
    {formatPhoneNumber(patient.phoneNumber)}
  </td>
  <td>
    {patient.email}
  </td>
  <td>
    {patient.address}
  </td>
  <td
    ><button title="Edit" on:click={edit}><Fa icon={faPencilAlt} /></button>
    <button title="Delete" on:click={removePatient}><Fa icon={faTrash} /></button>
</RowWrapper>

<style>
  .urgency {
    font-weight: bold;
    text-align: center;
  }

  .urgency-1 {
    color: #ffea00;
  }
  .urgency-2 {
    color: orange;
  }
  .urgency-3 {
    color: red;
  }

  .injuries {
    display: flex;
    align-items: center;
  }
</style>
