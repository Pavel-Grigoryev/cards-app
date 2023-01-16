import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'

export const handleServerNetworkError = (
  err: AxiosError<{ message: string }>,
  dispatch: Dispatch
) => {
  const error = err.response?.data ? err.response.data.message : err.message

  dispatch(setAppErrorAC({ error }))
  dispatch(setAppStatusAC({ status: 'failed' }))
}
