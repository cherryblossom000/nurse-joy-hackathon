<script lang="ts">
  import PatientInput from './PatientInput.svelte'
  import type {Patient} from '@nurse-joy-hackathon/shared'

  export let patient: Patient
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
</script>

<PatientInput {patient} {update} cancel={stopEditing} />
