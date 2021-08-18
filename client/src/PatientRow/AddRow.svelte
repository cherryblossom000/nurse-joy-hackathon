<script lang="ts">
  import PatientInput from './PatientInput.svelte'
  import type {Patient, PatientWithoutId} from '@nurse-joy-hackathon/shared'

  export let patient: PatientWithoutId
  export let cancel: () => void
  export let stopEditing: (patient: Patient) => void

  const add = async (): Promise<void> => {
    // TODO: error handling
    const newPatient = (await (
      await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // TODO: validation
        body: JSON.stringify({
          ...patient,
          phoneNumber: [...patient.phoneNumber].filter(s => s).join('')
        })
      })
    ).json()) as Patient
    stopEditing(newPatient)
  }
</script>

<PatientInput {patient} update={add} {cancel} />
