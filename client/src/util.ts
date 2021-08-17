import {Gender} from '../../shared'
import type {Urgency} from '../../shared'

export const formatUrgency = (urgency: Urgency): string => '!'.repeat(urgency)

export const formatGender = (gender: Gender): string => {
  switch (gender) {
    case Gender.Male:
      return 'Male'
    case Gender.Female:
      return 'Female'
    case Gender.Other:
      return 'Other'
  }
}

export const formatPhoneNumber = (phoneNumber: string): string =>
  [phoneNumber.slice(0, 4), phoneNumber.slice(4, 7), phoneNumber.slice(7)].join(
    ' '
  )
