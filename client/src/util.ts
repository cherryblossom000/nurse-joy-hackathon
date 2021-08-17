import {Gender} from '@nurse-joy-hackathon/shared'
import type {Urgency} from '@nurse-joy-hackathon/shared'

export const allGenders = Object.entries(Gender).filter(
  (entry): entry is [string, Gender] =>
    (isNaN as (number: unknown) => boolean)(entry[0])
)

export const allUrgencies = [1, 2, 3] as const

export const formatUrgency = (urgency: Urgency): string => '!'.repeat(urgency)

export const formatGender = (gender: Gender): string => Gender[gender]!

export const formatPhoneNumber = (phoneNumber: string): string =>
  [phoneNumber.slice(0, 4), phoneNumber.slice(4, 7), phoneNumber.slice(7)].join(
    ' '
  )
