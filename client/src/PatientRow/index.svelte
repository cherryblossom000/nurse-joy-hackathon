<script lang="ts">
  import EditRow from './EditRow.svelte'
  import ViewRow from './ViewRow.svelte'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
  export let remove: () => void

  let editing = false
</script>

{#if editing}
  <EditRow bind:patient stopEditing={() => (editing = false)} />
{:else}
  <ViewRow bind:patient {remove} edit={() => (editing = true)} />
{/if}
