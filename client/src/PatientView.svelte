<script lang="ts">
  import {urgencyToString} from './util'
  import Fa from 'svelte-fa'
  import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
  import type {Patient} from '../../shared'

  export let patient: Patient
</script>

<div class="patient">
  <span class="urgency urgency-{patient.urgency}">{@html urgencyToString(patient.urgency)}</span>
  <span class="name">{patient.name}</span>
  <!-- using the .edit directly on Fa causes the CSS modules to stuff up -->
  <span class="edit"><Fa icon={faPencilAlt} /></span>
</div>

<style>
  .patient {
    display: flex;
    padding: .5rem;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, .1);
  }

  .name, .urgency {
    font-weight: bold;
  }

  .urgency-1 { color: #ffea00; }
  .urgency-2 { color: orange; }
  .urgency-3 { color: red; }

  .edit {
    margin-left: auto;
  }
</style>
