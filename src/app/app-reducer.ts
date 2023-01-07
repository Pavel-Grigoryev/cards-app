const initialState = {}

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: any
): InitialAppStateType => {
  switch (action.type) {
    default:
      return state
  }
}

//Types

export type InitialAppStateType = typeof initialState
