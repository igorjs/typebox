import { Type } from '@sinclair/typebox'
import { ValueErrorType } from '@sinclair/typebox/errors'
import { Resolve } from './resolve'
import { Assert } from '../../assert'

describe('errors/type/DateMultipleOfTimestamp', () => {
  const T = Type.Date({ multipleOfTimestamp: 2 })
  it('Should pass 0', () => {
    const R = Resolve(T, new Date(0))
    Assert.IsEqual(R.length, 0)
  })
  it('Should pass 1', () => {
    const R = Resolve(T, new Date(1))
    Assert.IsEqual(R.length, 1)
    Assert.IsEqual(R[0].type, ValueErrorType.DateMultipleOfTimestamp)
  })
})
