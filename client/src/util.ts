import {Gender} from '../../shared'
import type {Urgency} from '../../shared'

export const urgencyToString = (urgency: Urgency): string => '!'.repeat(urgency)

export const genderToString = (gender: Gender): string => {
  switch (gender) {
    case Gender.Male: return 'Male'
    case Gender.Female: return 'Female'
    case Gender.Other: return 'Other'
  }
}
