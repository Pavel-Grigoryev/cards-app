import { AppRootStateType } from '../../app/store'

export const cardsData = (state: AppRootStateType) => state.cards.cards

export const searchData = (state: AppRootStateType) => state.cards.search

export const pageData = (state: AppRootStateType) => state.cards.page

export const pageCountData = (state: AppRootStateType) => state.cards.pageCount

export const cardsTotalCountData = (state: AppRootStateType) => state.cards.cardsTotalCount

export const packUserId = (state: AppRootStateType) => state.cards.packUserId

export const sortCards = (state: AppRootStateType) => state.cards.sortCards
