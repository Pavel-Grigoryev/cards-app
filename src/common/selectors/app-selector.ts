import { AppRootStateType } from '../../app/store'

export const isInitializedSelector = (state: AppRootStateType) => state.app.isInit

export const isLoading = (state: AppRootStateType) => state.app.status
