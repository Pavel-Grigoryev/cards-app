import React, { ChangeEvent, useEffect, useState } from 'react'

import { Radio, RadioGroup, Rating } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useParams } from 'react-router-dom'

import { getCardsTC, sendCardGradeTC } from '../PackPage/packPage-reducer'

import s from './LearnPage.module.scss'
import { getCard } from './learnPageRandom'

import { CardType } from 'app/api/cardsAPI/cardsAPITypes'
import { useAppDispatch, useAppSelector } from 'app/store'
import { ReturnLink } from 'common/components/ReturnLink/ReturnLink'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { NEW_CARD } from 'common/constants/newCardEmptyProp'
import { PATH } from 'common/routes/routes'
import { cardsData } from 'common/selectors/cards-selector'

const grades = [
  { value: 1, label: "Didn't know" },
  { value: 2, label: 'Forgot' },
  { value: 3, label: 'Doubted' },
  { value: 4, label: 'Confused' },
  { value: 5, label: 'Knew the answer' },
]

export const LearnPage = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(cardsData)
  const packName = useAppSelector(state => state.cards.packName)

  const { id } = useParams<string>()

  const [grade, setGrade] = useState<number>(0)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const [card, setCard] = useState<CardType>({
    answer: '',
    question: '',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
    _id: '',
    rating: 0,
    comments: '',
    __v: '',
    type: '',
  })

  useEffect(() => {
    if (first && id) {
      dispatch(getCardsTC({ cardsPack_id: id, pageCount: 999999 }))
      setFirst(false)
    }
    if (cards.length > 0) setCard(getCard(cards))

    return () => {}
  }, [dispatch, id, cards, first])

  const onNext = () => {
    dispatch(sendCardGradeTC({ grade, card_id: card._id }))
    setIsChecked(false)
    setGrade(0)
  }

  const setGradeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setGrade(Number(event.currentTarget.value))
  }

  return (
    <div>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.box}>
        <h1 className={s.title}>Learn {`"${packName}"`}</h1>
        <div className={s.case}>
          <div>
            {card.questionImg && card.questionImg !== NEW_CARD.EMPTY_IMG ? (
              <div>
                <div className={s.question}>
                  Question:
                  <div className={s.rating}>
                    <Rating precision={0.1} readOnly value={card.grade} />
                  </div>
                </div>
                <div className={s.imageBlock}>
                  <img className={s.image} src={card.questionImg} alt={'Question image'} />
                </div>
              </div>
            ) : (
              <div className={s.question}>
                Question: {card.question}
                <div className={s.rating}>
                  <Rating precision={0.1} readOnly value={card.grade} />
                </div>
              </div>
            )}
            <div className={s.attempts}>
              <span>Number of attempts to answer the question: </span>
              <span className={s.attemptsNum}>{card.shots}</span>
            </div>
            {!isChecked && (
              <SuperButton
                onClick={() => setIsChecked(true)}
                title={'Show answer'}
                styleSX={{
                  mt: '20px',
                  width: '80%',
                }}
              />
            )}
            {isChecked && (
              <>
                {card.answerImg && card.answerImg !== NEW_CARD.EMPTY_IMG ? (
                  <div>
                    <div className={s.question}>Answer:</div>
                    <div className={s.imageBlock}>
                      <img className={s.image} src={card.answerImg} alt={'Answer image'} />
                    </div>
                  </div>
                ) : (
                  <div className={s.answerCase}>
                    <span className={s.answer}>Answer: </span>
                    <span className={s.answerText}>{card.answer}</span>
                  </div>
                )}

                <FormControl className={s.rateCase}>
                  <div className={s.rateLabel}>Rate yourself:</div>
                  <RadioGroup onChange={setGradeHandler} className={s.radioButton}>
                    {grades.map((g, i) => (
                      <FormControlLabel
                        key={'grade-' + i}
                        value={g.value}
                        control={<Radio color={'secondary'} />}
                        label={g.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <div>
                  <SuperButton
                    disabled={grade === 0}
                    onClick={onNext}
                    title={'Next'}
                    styleSX={{
                      mt: '20px',
                      width: '80%',
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
