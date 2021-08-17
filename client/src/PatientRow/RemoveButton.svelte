<script lang="ts">
  import Fa from 'svelte-fa'
  import {faTimes} from '@fortawesome/free-solid-svg-icons'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
  export let remove: () => void

  const onClick = async (): Promise<void> => {
    // TODO: error handling
    await fetch(`/api/patients/${patient._id}`, {method: 'DELETE'})
    remove()
  }
</script>

<button on:click={onClick}><Fa icon={faTimes} /></button>
