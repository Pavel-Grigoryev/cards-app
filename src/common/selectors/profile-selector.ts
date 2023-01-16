import { AppRootStateType } from '../../app/store'

export const entityStatusSelector = (state: AppRootStateType) => state.userProfile.entityStatus
