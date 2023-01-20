import { AppRootStateType } from '../../app/store'

export const packsData = (state: AppRootStateType) => state.packs.cardPacks

export const pageData = (state: AppRootStateType) => state.packs.page

export const pageCountData = (state: AppRootStateType) => state.packs.pageCount

export const cardPacksTotalCountData = (state: AppRootStateType) => state.packs.cardPacksTotalCount

export const searchData = (state: AppRootStateType) => state.packs.search

export const sortPacks = (state: AppRootStateType) => state.packs.sortPacks

export const showPackCardsData = (state: AppRootStateType) => state.packs.showPackCards

export const minCardsCountData = (state: AppRootStateType) => state.packs.minCardsCount

export const maxCardsCountData = (state: AppRootStateType) => state.packs.maxCardsCount

export const minData = (state: AppRootStateType) => state.packs.min

export const maxData = (state: AppRootStateType) => state.packs.max
