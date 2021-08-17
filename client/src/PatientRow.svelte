<script lang="ts">
  import {
    allGenders,
    formatGender,
    formatPhoneNumber,
    formatUrgency
  } from './util'
  import Fa from 'svelte-fa'
  import {
    faCheck,
    faPencilAlt,
    faTimes
  } from '@fortawesome/free-solid-svg-icons'
  import type {Patient} from '../../shared'

  export let patient: Patient
  export let remove: () => void

  let editing = false
  let {
    name,
    age,
    gender,
    injuryType,
    height,
    weight,
    phoneNumber,
    email,
    address
  } = patient

  const handleBtnClick = async (): Promise<void> => {
    if (editing) {
      editing = false
      // TODO: error handling
      await fetch(`/api/patients/${patient._id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name,
          age,
          gender,
          injuryType,
          height,
          weight,
          phoneNumber,
          email,
          address
        })
      })
    } else {
      editing = true
    }
  }

  const handleRemove = async (): Promise<void> => {
    // TODO: error handling
    await fetch(`/api/patients/${patient._id}`, {method: 'DELETE'})
    remove()
  }
</script>

<tr class="patient">
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
  <td>
    {#if editing}
      <input type="text" bind:value={injuryType} />
    {:else}
      {injuryType}
    {/if}
  </td>
  <td>
    {#if editing}
      <input type="number" bind:value={age} />
    {:else}
      {age}
    {/if}
  </td>
  <td>
    {#if editing}
      <select>
        {#each allGenders as [name, value]}
          <option {value} selected={value === gender}>{name}</option>
        {/each}
      </select>
    {:else}
      {formatGender(gender)}
    {/if}
  </td>
  <td>
    {#if editing}
      <input type="number" bind:value={height} />
    {:else}
      {height}
    {/if} cm
  </td>
  <td>
    {#if editing}
      <input type="number" bind:value={weight} />
    {:else}
      {weight}
    {/if} kg
  </td>
  <td>
    {#if editing}
      <input type="tel" bind:value={phoneNumber} />
    {:else}
      {formatPhoneNumber(phoneNumber)}
    {/if}
  </td>
  <td>
    {#if editing}
      <input type="email" bind:value={email} />
    {:else}
      {email}
    {/if}
  </td>
  <td>
    {#if editing}
      <input type="text" bind:value={address} />
    {:else}
      {address}
    {/if}
  </td>
  <td
    ><button on:click={handleBtnClick}
      ><Fa icon={editing ? faCheck : faPencilAlt} /></button
    >
    <button on:click={handleRemove}><Fa icon={faTimes} /></button></td
  >
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
