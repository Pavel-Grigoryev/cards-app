import React, { useEffect, useState } from 'react'

import { Radio, RadioGroup, Rating } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useParams } from 'react-router-dom'

import { CardType } from '../../app/api/cardsAPI/cardsAPITypes'
import { useAppDispatch, useAppSelector } from '../../app/store'
import { ReturnLink } from '../../common/components/ReturnLink/ReturnLink'
import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { PATH } from '../../common/routes/routes'
import { cardsData } from '../../common/selectors/cards-selector'
import { getCardsTC } from '../PackPage/packPage-reducer'

import s from './LearnPage.module.scss'

const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Сonfused', 'Knew the answer']

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////Random/////////////////////////////////////////
const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
export const LearnPage = () => {
  const dispatch = useAppDispatch()
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const cards = useAppSelector(cardsData)
  const { id } = useParams<string>()
  const packName = useAppSelector(state => state.cards.packName)

  const [card, setCard] = useState<CardType>({
    answer: 'answer',
    question: 'question',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
    _id: 'fake',
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
    setIsChecked(false)

    if (cards.length > 0) {
      // dispatch
      setCard(getCard(cards))
    }
  }

  return (
    <div>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div className={s.box}>
        <h1 className={s.title}>Learn {`"${packName}"`}</h1>
        <div className={s.case}>
          <div>
            <div className={s.question}>
              Question: {card.question}
              <div className={s.rating}>
                <Rating onChange={() => {}} precision={0.1} readOnly value={card.grade} />
              </div>
            </div>

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
                <div className={s.answerCase}>
                  <span className={s.answer}>Answer: </span>
                  <span className={s.answerText}>{card.answer}</span>
                </div>
                <FormControl className={s.rateCase}>
                  <div className={s.rateLabel}>Rate yourself:</div>
                  <RadioGroup onChange={() => {}} className={s.radioButton}>
                    {grades.map((g, i) => (
                      <FormControlLabel
                        key={'grade-' + i}
                        value={g}
                        control={<Radio color={'secondary'} />}
                        label={g}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                <div>
                  <SuperButton
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
