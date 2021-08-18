<script lang="ts">
  import {allGenders, allUrgencies, formatUrgency} from '../util'
  import Fa from 'svelte-fa'
  import {faCheck} from '@fortawesome/free-solid-svg-icons'
  import RowWrapper from './RowWrapper.svelte'
  import RemoveButton from './RemoveButton.svelte'
  import type {PatientWithoutId} from '@nurse-joy-hackathon/shared'

  export let patient: PatientWithoutId
  export let update: () => void
  export let remove: () => void

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
</script>

<RowWrapper>
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
    ><button on:click={update}><Fa icon={faCheck} /></button>
    <RemoveButton onClick={remove} />
  </td></RowWrapper
>
