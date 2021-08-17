import type {Urgency} from '../../shared'

// eslint-disable-next-line import/prefer-default-export -- util file
export const urgencyToString = (urgency: Urgency): string =>
  '&nbsp;'.repeat(3 - urgency) + '!'.repeat(urgency)
