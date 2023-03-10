import React, { useEffect, useState } from 'react'

import ClickAwayListener from '@mui/material/ClickAwayListener'
import { Navigate, useParams } from 'react-router-dom'

import { AddNewCardModal, ModeType } from '../Modals/AddNewCardModal/AddNewCardModal'

import {
  changePackCardsDeleteStatus,
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
import noImg from 'assets/images/download.png'
import pop from 'assets/images/pop.png'
import { CardsTable } from 'common/components/CardsTable/CardsTable'
import { Dropdown } from 'common/components/Dropdown/Dropdown'
import { NotFound } from 'common/components/NotFound/NotFound'
import { ReturnLink } from 'common/components/ReturnLink/ReturnLink'
import { Search } from 'common/components/Search/Search'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperPagination } from 'common/components/SuperPagination/SuperPagination'
import { SuperTooltip } from 'common/components/SuperTooltip/SuperTooltip'
import { NEW_CARD } from 'common/constants/newCardEmptyProp'
import { PATH } from 'common/routes/routes'
import {
  cardsData,
  cardsTotalCountData,
  packCardsDeleteStatusData,
  packDeckCover,
  packNameData,
  packUserId,
  pageCountData,
  pageData,
  searchData,
  sortCards,
} from 'common/selectors/cards-selector'
import { userIdData } from 'common/selectors/profile-selector'
import { SearchPaperSX } from 'common/styles/sx/sx_styles'

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
  const packName = useAppSelector(packNameData)
  const packCardsDeleteStatus = useAppSelector(packCardsDeleteStatusData)
  const packCover = useAppSelector(packDeckCover)

  console.log(packCover)

  const { id } = useParams<string>()

  const [isImgBroken, setImgBroken] = useState(false)

  const errorHandler = () => {
    setImgBroken(true)
  }

  const [open, setOpen] = useState(false)

  const createNewCardHandler = (newQuestion: string, newAnswer: string, mode: ModeType) => {
    if (id) {
      if (mode === 'text') {
        dispatch(
          createCardTC({
            card: {
              cardsPack_id: id,
              question: newQuestion,
              answer: newAnswer,
              answerImg: NEW_CARD.EMPTY_IMG,
              questionImg: NEW_CARD.EMPTY_IMG,
            },
          })
        )
      } else {
        dispatch(
          createCardTC({
            card: {
              cardsPack_id: id,
              questionImg: newQuestion,
              answerImg: newAnswer,
              question: NEW_CARD.EMPTY_QUES,
              answer: NEW_CARD.EMPTY_ANS,
            },
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
    if (mode === 'text') {
      dispatch(
        updateCardTC({
          card: {
            _id: cardId,
            question: newQuestion,
            answer: newAnswer,
            answerImg: NEW_CARD.EMPTY_IMG,
            questionImg: NEW_CARD.EMPTY_IMG,
          },
        })
      )
    } else {
      dispatch(
        updateCardTC({
          card: {
            _id: cardId,
            questionImg: newQuestion,
            answerImg: newAnswer,
            question: NEW_CARD.EMPTY_QUES,
            answer: NEW_CARD.EMPTY_ANS,
          },
        })
      )
    }
  }

  const changeSearchHandler = (newValue: string | undefined) => {
    dispatch(updateCardsSearch({ newValue }))
  }

  const changePaginationHandler = (page: number, pageCount: number) => {
    dispatch(updateCardsPagination({ page, pageCount }))
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  const handleTooltipClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (id) {
      dispatch(
        getCardsTC({ cardsPack_id: id, cardQuestion: search, page, pageCount, sortCards: sort })
      )
    }

    return () => {
      dispatch(changePackCardsDeleteStatus({ packCardsDeleteStatus: 'idle' }))
    }
  }, [search, page, pageCount, sort])

  if (packCardsDeleteStatus === 'succeeded') {
    return <Navigate to={PATH.PACKS_LIST} />
  }

  return (
    <>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.head}>
        <div className={s.titleWrapper}>
          <h1 className={s.title}>{packName}</h1>
          {userPackId === userId ? (
            <ClickAwayListener onClickAway={handleTooltipClose}>
              <div>
                <SuperTooltip
                  title={
                    <Dropdown
                      learn={props.studyPackHandler}
                      handleTooltipClose={handleTooltipClose}
                    />
                  }
                  placement={'bottom-end'}
                  open={open}
                  disableFocusListener
                  disableHoverListener
                  disableTouchListener
                  className={s.toolTip}
                >
                  <button type={'button'} className={s.popImgWrap}>
                    <img className={s.popImg} src={pop} alt="" onClick={handleTooltipOpen} />
                  </button>
                </SuperTooltip>
              </div>
            </ClickAwayListener>
          ) : (
            ''
          )}
        </div>

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
      {packCover && (
        <div className={s.deckCoverBlock}>
          <img
            alt={'cover'}
            src={isImgBroken ? noImg : packCover}
            className={s.deckCover}
            onError={errorHandler}
          />
        </div>
      )}

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
            <CardsTable
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
