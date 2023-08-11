import { Type } from '@sinclair/typebox'
import { ValueErrorType } from '@sinclair/typebox/errors'
import { Resolve } from './resolve'
import { Assert } from '../../assert'

describe('errors/type/NumberExclusiveMinimum', () => {
  const T = Type.Number({ exclusiveMinimum: 4 })
  it('Should pass 0', () => {
    const R = Resolve(T, 5)
    Assert.IsEqual(R.length, 0)
  })
  it('Should pass 1', () => {
    const R = Resolve(T, 4)
    Assert.IsEqual(R.length, 1)
    Assert.IsEqual(R[0].type, ValueErrorType.NumberExclusiveMinimum)
  })
})
