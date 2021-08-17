<script lang="ts">
  import {allGenders, allUrgencies, formatUrgency} from '../util'
  import Fa from 'svelte-fa'
  import {faCheck} from '@fortawesome/free-solid-svg-icons'
  import PatientRow from './PatientRow.svelte'
  import RemoveButton from './RemoveButton.svelte'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
  export let remove: () => void
  export let stopEditing: () => void

  let {
    name,
    age,
    gender,
    urgency,
    injuryType,
    height,
    weight,
    phoneNumber,
    email,
    address
  } = patient
  $: patient.name = name
  $: patient.age = age
  $: patient.gender = gender
  $: patient.urgency = urgency
  $: patient.injuryType = injuryType
  $: patient.height = height
  $: patient.weight = weight
  $: patient.phoneNumber = phoneNumber
  $: patient.email = email
  $: patient.address = address

  const handleBtnClick = async (): Promise<void> => {
    // TODO: error handling
    await fetch(`/api/patients/${patient._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        age,
        gender,
        urgency,
        injuryType,
        height,
        weight,
        phoneNumber,
        email,
        address
      })
    })
    stopEditing()
  }
</script>

<PatientRow>
  <td>
    <select>
      {#each allUrgencies as value}
        <option {value} selected={value === urgency}
          >{formatUrgency(value)}</option
        >
      {/each}
    </select>
  </td>
  <td>
    <input type="text" bind:value={name} />
  </td>
  <td>
    <input type="text" bind:value={injuryType} />
  </td>
  <td>
    <input type="number" bind:value={age} />
  </td>
  <td>
    <select>
      {#each allGenders as [name, value]}
        <option {value} selected={value === gender}>{name}</option>
      {/each}
    </select>
  </td>
  <td>
    <input type="number" bind:value={height} /> cm
  </td>
  <td>
    <input type="number" bind:value={weight} /> kg
  </td>
  <td>
    <input type="tel" bind:value={phoneNumber} />
  </td>
  <td>
    <input type="email" bind:value={email} />
  </td>
  <td>
    <input type="text" bind:value={address} />
  </td>
  <td
    ><button on:click={handleBtnClick}><Fa icon={faCheck} /></button>
    <RemoveButton {patient} {remove} />
  </td></PatientRow
>
