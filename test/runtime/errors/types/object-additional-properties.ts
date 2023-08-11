import { Type } from '@sinclair/typebox'
import { ValueErrorType } from '@sinclair/typebox/errors'
import { Resolve } from './resolve'
import { Assert } from '../../assert'

describe('errors/type/ObjectAdditionalProperties', () => {
  // ----------------------------------------------------------
  // additionalProperties: false
  // ----------------------------------------------------------
  const T1 = Type.Object(
    {
      x: Type.Number(),
    },
    { additionalProperties: false },
  )
  it('Should pass 0', () => {
    const R = Resolve(T1, { x: 1 })
    Assert.IsEqual(R.length, 0)
  })
  it('Should pass 1', () => {
    const R = Resolve(T1, { x: 1, y: 1 })
    Assert.IsEqual(R.length, 1)
    Assert.IsEqual(R[0].type, ValueErrorType.ObjectAdditionalProperties)
  })
  // ----------------------------------------------------------
  // additionalProperties: TSchema
  // ----------------------------------------------------------
  const T2 = Type.Object(
    {
      x: Type.Number(),
    },
    { additionalProperties: Type.String() },
  )
  it('Should pass 2', () => {
    const R = Resolve(T2, { x: 1 })
    Assert.IsEqual(R.length, 0)
  })
  it('Should pass 3', () => {
    const R = Resolve(T2, { x: 1, a: 1, b: 2 })
    Assert.IsEqual(R.length, 2)
    Assert.IsEqual(R[0].type, ValueErrorType.String)
    Assert.IsEqual(R[0].path, '/a')
    Assert.IsEqual(R[0].value, 1)
    Assert.IsEqual(R[1].type, ValueErrorType.String)
    Assert.IsEqual(R[1].path, '/b')
    Assert.IsEqual(R[1].value, 2)
  })
})
