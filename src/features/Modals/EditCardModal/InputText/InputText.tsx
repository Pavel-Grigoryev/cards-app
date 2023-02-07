import React from 'react'

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import s from '../EditCardModal.module.scss'

import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { NEW_CARD } from 'common/constants/newCardEmptyProp'
import styles from 'common/styles/errors.module.scss'
import { addNewCardSchema } from 'common/utils/validationSchema'

type InputTextPropsType = {
  updateCard: (newQuestion: string, newAnswer: string) => void
  rowQuestion: string
  rowAnswer: string
}

export const InputText: React.FC<InputTextPropsType> = ({ updateCard, rowQuestion, rowAnswer }) => {
  const cardRowQuestion = rowQuestion === NEW_CARD.EMPTY_QUES ? '' : rowQuestion

  const cardRowAnswer = rowAnswer === NEW_CARD.EMPTY_ANS ? '' : rowAnswer

  const formik = useFormik({
    initialValues: {
      question: cardRowQuestion,
      answer: cardRowAnswer,
    },

    validationSchema: addNewCardSchema,

    onSubmit: values => {
      updateCard(values.question, values.answer)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{ marginBottom: '15px' }}>
        <InputLabel color={'secondary'}>Question</InputLabel>
        <Input
          id="standard-basic"
          type={'text'}
          color={'secondary'}
          placeholder={'Question'}
          {...formik.getFieldProps('question')}
        />
        {formik.touched.question && formik.errors.question && !formik.values.question && (
          <div className={styles.errorText}>{formik.errors.question}</div>
        )}
      </FormControl>
      <FormControl fullWidth>
        <InputLabel color={'secondary'}>Answer</InputLabel>
        <Input
          id="standard-basic"
          type={'text'}
          color={'secondary'}
          placeholder={'Answer'}
          {...formik.getFieldProps('answer')}
        />
        {formik.touched.answer && formik.errors.answer && !formik.values.answer && (
          <div className={styles.errorText}>{formik.errors.answer}</div>
        )}
      </FormControl>
      <div className={s.buttons}>
        <SuperButton
          title={'Save'}
          styleSX={{
            mt: '30px',
            width: '40%',
          }}
        />
      </div>
    </form>
  )
}
