

const initialState = {}

export const authReducer = (state: InitialAuthStateType = initialState , action:any):InitialAuthStateType => {
    switch (action.type) {
        default:
            return state
    }
}

//Types

export type InitialAuthStateType = typeof initialState