export enum Gender {
  Male,
  Female,
  Other
}

export type Urgency = 1 | 2 | 3

export interface Patient {
  readonly name: string
  readonly age: number
  readonly height: number
  readonly weight: number
  readonly gender: Gender
  readonly phoneNumber: string
  readonly address: string
  readonly email: string
  readonly injuryType: string
  readonly urgency: Urgency
}
