<script lang="ts">
  import {formatGender, formatPhoneNumber, formatUrgency} from './util'
  import Fa from 'svelte-fa'
  import {faCheck, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
  import type {Patient} from '../../shared'

  export let patient: Patient

  let editing = false
  let name = patient.name

  const handleBtnClick = (): void => {
    if (editing) {
      editing = false
    } else {
      editing = true
    }
  }
</script>

<tr class="patient">
  {#if editing}
    <td class="urgency urgency-{patient.urgency}"
      >{formatUrgency(patient.urgency)}</td
    >
    <td>
      {#if editing}
        <input type="text" bind:value={name} />
      {:else}
        {name}
      {/if}
    </td>
    <td>{patient.injuryType}</td>
    <td>{patient.age}</td>
    <td>{formatGender(patient.gender)}</td>
    <td>{patient.height} cm</td>
    <td>{patient.weight} kg</td>
    <td>{formatPhoneNumber(patient.phoneNumber)}</td>
    <td>{patient.email}</td>
    <td>{patient.address}</td>
    <td><button on:click={handleBtnClick}><Fa icon={faCheck} /></button></td>
  {:else}
    <td class="urgency urgency-{patient.urgency}"
      >{formatUrgency(patient.urgency)}</td
    >
    <td>
      {#if editing}
        <input type="text" bind:value={name} />
      {:else}
        {name}
      {/if}
    </td>
    <td>{patient.injuryType}</td>
    <td>{patient.age}</td>
    <td>{formatGender(patient.gender)}</td>
    <td>{patient.height} cm</td>
    <td>{patient.weight} kg</td>
    <td>{formatPhoneNumber(patient.phoneNumber)}</td>
    <td>{patient.email}</td>
    <td>{patient.address}</td>
    <td><button on:click={handleBtnClick}><Fa icon={faPencilAlt} /></button></td
    >
  {/if}
</tr>

<style>
  .patient {
    border: 1px solid #222;
  }

  .urgency {
    font-weight: bold;
  }

  .urgency {
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
</style>
