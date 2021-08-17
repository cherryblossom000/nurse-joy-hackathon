<script lang="ts">
  import type {Patient} from '../../shared'
  export let patient: Patient
</script>

<div class="patient">
  <span class="name">{patient.name}</span>
</div>

<style>
  .patient {
    border: 1px solid #222;
    border-radius: 5px;
    padding: .5rem
  }

  .name {
    font-weight: bold;
  }
</style>
