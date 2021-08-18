<script lang="ts">
  import {allGenders, allUrgencies, formatUrgency} from '../util'
  import Fa from 'svelte-fa'
  import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons'
  import ListInput from './ListInput.svelte'
  import RowWrapper from './RowWrapper.svelte'
  import type {PatientWithoutId} from '@nurse-joy-hackathon/shared'

  export let patient: PatientWithoutId
  export let update: () => void
  export let cancel: () => void

  let {
    name,
    age,
    gender,
    urgency,
    injuries,
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
  $: patient.injuries = injuries
  $: patient.height = height
  $: patient.weight = weight
  $: patient.phoneNumber = phoneNumber
  $: patient.email = email
  $: patient.address = address
</script>

<RowWrapper>
  <td>
    <select bind:value={urgency}>
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
    <ListInput bind:data={injuries} />
  </td>
  <td>
    <input type="number" bind:value={age} />
  </td>
  <td>
    <select bind:value={gender}>
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
    <textarea bind:value={address} />
  </td>
  <td
    ><button on:click={update}><Fa icon={faCheck} /></button>
    <button title="Cancel" on:click={cancel}><Fa icon={faTimes} /></button>
  </td></RowWrapper
>

<style>
  input {
    width: 6rem;
  }

  input[type='number'] {
    width: 3em;
  }

  input[type='tel'] {
    width: 8em;
  }

  input[type='email'] {
    width: 10em;
  }
</style>
