import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../ui/app-reducer";
import {authReducer} from "../../features/auth/login/auth-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));

//Types

export type AppRootStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store;