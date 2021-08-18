<script lang="ts">
  import Fa from 'svelte-fa'
  import {faTimes} from '@fortawesome/free-solid-svg-icons'

  export let onClick: () => void
</script>

<button on:click={onClick}><Fa icon={faTimes} /></button>
