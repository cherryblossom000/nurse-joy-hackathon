import * as t from 'io-ts'

export enum Gender {
  Male,
  Female,
  Other
}

const Urgency = t.union([t.literal(1), t.literal(2), t.literal(3)])

export type Urgency = t.TypeOf<typeof Urgency>

export const PatientWithoutId = t.interface({
  name: t.string,
  age: t.number,
  height: t.number,
  weight: t.number,
  gender: t.union(
    Object.values(Gender)
      .filter((v): v is number => typeof v == 'number')
      .map(g => t.literal(g)) as [
      t.LiteralC<Gender.Male>,
      t.LiteralC<Gender.Female>,
      t.LiteralC<Gender.Other>
    ]
  ),
  phoneNumber: t.string,
  address: t.string,
  email: t.string,
  injuries: t.array(t.string),
  urgency: t.union([t.literal(1), t.literal(2), t.literal(3)])
})

export type PatientWithoutId = t.TypeOf<typeof PatientWithoutId>

export interface Patient extends PatientWithoutId {
  readonly _id: string
}
