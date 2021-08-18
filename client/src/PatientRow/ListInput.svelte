<script lang="ts">
  import Fa from 'svelte-fa'
  import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'

  export let data: string[]

  const handleChange = (input: HTMLInputElement, i: number) =>
    (data[i] = input.value)
</script>

<div class="inputs">
  {#each [...data.entries()] as [i, value]}
    <div>
      <input
        type="text"
        on:change={({currentTarget}) => handleChange(currentTarget, i)}
        {value}
      />
      <button on:click={() => (data = data.filter((_, j) => j !== i))}
        ><Fa icon={faMinus} /></button
      >
    </div>
  {/each}
  <button on:click={() => (data = [...data, ''])}><Fa icon={faPlus} /></button>
</div>

<style>
  .inputs {
    display: flex;
    flex-direction: column;
  }
</style>
