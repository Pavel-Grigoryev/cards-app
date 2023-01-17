import { AppRootStateType } from '../../app/store'

export const entityStatusData = (state: AppRootStateType) => state.userProfile.entityStatus

export const profileData = (state: AppRootStateType) => state.userProfile.profile

export const userIdData = (state: AppRootStateType) => state.userProfile.profile._id
