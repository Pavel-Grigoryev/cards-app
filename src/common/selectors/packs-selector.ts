import { AppRootStateType } from '../../app/store'

export const packsData = (state: AppRootStateType) => state.packs.cardPacks

export const pageData = (state: AppRootStateType) => state.packs.page

export const pageCountData = (state: AppRootStateType) => state.packs.pageCount

export const cardPacksTotalCountData = (state: AppRootStateType) => state.packs.cardPacksTotalCount

export const sortPacks = (state: AppRootStateType) => state.packs.sortPacks
