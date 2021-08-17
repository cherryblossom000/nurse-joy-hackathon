<script lang="ts">
  import {formatGender, formatPhoneNumber, formatUrgency} from './util'
  import Fa from 'svelte-fa'
  import {faPencilAlt} from '@fortawesome/free-solid-svg-icons'
  import type {Patient} from '../../shared'

  export let patient: Patient
</script>

<tr class="patient">
  <td class="urgency urgency-{patient.urgency}">{formatUrgency(patient.urgency)}</td>
  <td>{patient.name}</td>
  <td>{patient.injuryType}</td>
  <td>{patient.age}</td>
  <td>{formatGender(patient.gender)}</td>
  <td>{patient.height} cm</td>
  <td>{patient.weight} kg</td>
  <td>{formatPhoneNumber(patient.phoneNumber)}</td>
  <td>{patient.email}</td>
  <td>{patient.address}</td>
  <!-- using the .edit directly on Fa causes the CSS modules to stuff up -->
  <td class="edit"><Fa icon={faPencilAlt} /></td>
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

  .urgency-1 { color: #ffea00; }
  .urgency-2 { color: orange; }
  .urgency-3 { color: red; }
</style>
