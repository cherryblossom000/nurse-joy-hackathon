import {Gender} from '@nurse-joy-hackathon/shared'
import type {
  Patient,
  PatientWithoutId,
  Urgency
} from '@nurse-joy-hackathon/shared'

export const allGenders = Object.entries(Gender).filter(
  (entry): entry is [string, Gender] =>
    (isNaN as (number: unknown) => boolean)(entry[0])
)

export const allUrgencies = [1, 2, 3] as const

export const defaultPatient = (): PatientWithoutId => ({
  name: '',
  age: 0,
  gender: Gender.Other,
  urgency: 1,
  injuries: [],
  height: 0,
  weight: 0,
  phoneNumber: '',
  email: '',
  address: ''
})

export const formatUrgency = (urgency: Urgency): string => '!'.repeat(urgency)

export const formatGender = (gender: Gender): string => Gender[gender]!

export const formatPhoneNumber = (phoneNumber: string): string =>
  phoneNumber.startsWith('+') && phoneNumber.length === 12
    ? [
        phoneNumber.slice(0, 3),
        phoneNumber.slice(3, 6),
        phoneNumber.slice(6, 9),
        phoneNumber.slice(9)
      ].join(' ')
    : phoneNumber.length === 10
    ? [
        phoneNumber.slice(0, 4),
        phoneNumber.slice(4, 7),
        phoneNumber.slice(7)
      ].join(' ')
    : phoneNumber.length === 8
    ? [phoneNumber.slice(0, 4), phoneNumber.slice(4)].join(' ')
    : phoneNumber

export const deletePatient = async (patient: Patient): Promise<void> => {
  await fetch(`/api/patients/${patient._id}`, {method: 'DELETE'})
}
