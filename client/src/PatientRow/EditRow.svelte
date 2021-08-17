<script lang="ts">
  import PatientInput from './PatientInput.svelte'
  import {deletePatient} from '../util'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
  export let remove: () => void
  export let stopEditing: () => void

  const update = async (): Promise<void> => {
    const {_id, ...rest} = patient
    // TODO: error handling
    await fetch(`/api/patients/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    })
    stopEditing()
  }

  const removePatient = async (): Promise<void> => {
    // TODO: error handling
    await deletePatient(patient)
    remove()
  }
</script>

<PatientInput {patient} {update} remove={removePatient} />
