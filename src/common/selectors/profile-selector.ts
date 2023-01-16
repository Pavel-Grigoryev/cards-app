import { AppRootStateType } from '../../app/store'

export const entityStatusSelector = (state: AppRootStateType) => state.userProfile.entityStatus

export const profileSelector = (state: AppRootStateType) => state.userProfile.profile
