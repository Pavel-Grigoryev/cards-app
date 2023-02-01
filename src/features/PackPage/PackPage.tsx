import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { AddNewCardModal, ModeType } from '../Modals/AddNewCardModal/AddNewCardModal'

import {
  createCardTC,
  deleteCardTC,
  getCardsTC,
  setSortCards,
  updateCardsPagination,
  updateCardsSearch,
  updateCardTC,
} from './packPage-reducer'
import s from './PackPage.module.scss'

import { useAppDispatch, useAppSelector } from 'app/store'
import { NotFound } from 'common/components/NotFound/NotFound'
import { ReturnLink } from 'common/components/ReturnLink/ReturnLink'
import { Search } from 'common/components/Search/Search'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperPagination } from 'common/components/SuperPagination/SuperPagination'
import { SuperTable } from 'common/components/SuperTable/SuperTable'
import { PATH } from 'common/routes/routes'
import {
  cardsData,
  cardsTotalCountData,
  packUserId,
  pageCountData,
  pageData,
  searchData,
  sortCards,
} from 'common/selectors/cards-selector'
import { userIdData } from 'common/selectors/profile-selector'
import { SearchPaperSX } from 'common/styles/sx/sx_styles'
import { packPageTableNames } from 'common/utils/tableHeaderData'

type PackPagePropsType = {
  studyPackHandler: (cardId: string) => void
}

export const PackPage = (props: PackPagePropsType) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(cardsData)
  const search = useAppSelector(searchData)
  const page = useAppSelector(pageData)
  const pageCount = useAppSelector(pageCountData)
  const cardsTotalCount = useAppSelector(cardsTotalCountData)
  const sort = useAppSelector(sortCards)
  const userPackId = useAppSelector(packUserId)
  const userId = useAppSelector(userIdData)
  const packName = useAppSelector(state => state.cards.packName)

  const { id } = useParams<string>()

  const createNewCardHandler = (newQuestion: string, newAnswer: string, mode: ModeType) => {
    if (id) {
      if (mode === 'text') {
        dispatch(
          createCardTC({ card: { cardsPack_id: id, question: newQuestion, answer: newAnswer } })
        )
      } else {
        dispatch(
          createCardTC({
            card: { cardsPack_id: id, questionImg: newQuestion, answerImg: newAnswer },
          })
        )
      }
    }
  }

  const deleteCardHandler = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
  }

  const sortingHandler = (sortCards: string) => {
    dispatch(setSortCards({ sortCards }))
  }

  const updateCardHandler = (
    cardId: string,
    newQuestion: string,
    newAnswer: string,
    mode: ModeType
  ) => {
    debugger
    if (mode === 'text') {
      dispatch(updateCardTC({ card: { _id: cardId, question: newQuestion, answer: newAnswer } }))
    } else {
      dispatch(
        updateCardTC({ card: { _id: cardId, questionImg: newQuestion, answerImg: newAnswer } })
      )
    }
  }

  const changeSearchHandler = (newValue: string | undefined) => {
    dispatch(updateCardsSearch({ newValue }))
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updateCardsPagination({ page, pageCount }))
  }

  useEffect(() => {
    if (id) {
      dispatch(
        getCardsTC({ cardsPack_id: id, cardQuestion: search, page, pageCount, sortCards: sort })
      )
    }
  }, [search, page, pageCount, sort])

  return (
    <>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.head}>
        <h1>
          {packName} {/*{userPackId === userId ? (*/}
          {/*  <SuperTooltip*/}
          {/*    title={<PopLink learn={props.studyPackHandler} />}*/}
          {/*    placement={'bottom-end'}*/}
          {/*  >*/}
          {/*    <button className={s.popImgWrap}>*/}
          {/*      <img className={s.popImg} src={pop} alt="" />*/}
          {/*    </button>*/}
          {/*  </SuperTooltip>*/}
          {/*) : (*/}
          {/*  ''*/}
          {/*)}*/}
        </h1>
        {userPackId === userId ? (
          <div>
            <AddNewCardModal title={'Add new card'} createNewCardHandler={createNewCardHandler} />
            <div style={{ padding: '10px' }}>
              <SuperButton
                title={'Learn to pack'}
                disabled={cards.length === 0}
                onClick={() => props.studyPackHandler(id!)}
              />
            </div>
          </div>
        ) : (
          <SuperButton title={'Learn to pack'} onClick={() => props.studyPackHandler(id!)} />
        )}
      </div>
      <div>
        <div className={s.searchBlock}>
          <Search
            value={search}
            onChange={changeSearchHandler}
            paperStyle={{ ...SearchPaperSX, width: '100%' }}
          />
        </div>

        {cardsTotalCount ? (
          <div className={s.wrapper}>
            <SuperTable
              headerNames={packPageTableNames}
              bodyData={cards}
              deleteHandler={deleteCardHandler}
              sortingHandler={sortingHandler}
              updateCardHandler={updateCardHandler}
            />
            <SuperPagination
              page={page}
              itemsCountForPage={pageCount}
              totalCount={cardsTotalCount}
              onChange={changePaginationHandler}
            />
          </div>
        ) : (
          <NotFound
            message={'Cards not found. Add a card to this pack or change your search options.'}
          />
        )}
      </div>
    </>
  )
}
