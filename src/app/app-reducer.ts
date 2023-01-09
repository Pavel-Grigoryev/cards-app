const initialState: InitialAppStateType = {
  status: 'idle',
  error: null,
}

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: ActionsType
): InitialAppStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    default:
      return state
  }
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: 'APP/SET-STATUS', status } as const)

//Types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialAppStateType = {
  status: RequestStatusType
  error: string | null
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

type ActionsType = SetAppErrorActionType | SetAppStatusActionType
