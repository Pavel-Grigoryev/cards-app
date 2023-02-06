import React from 'react'

import { useFormik } from 'formik'

import s from '../EditCardModal.module.scss'

import { InputQuestion } from 'common/components/InputQuestion/InputQuestion'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { NEW_CARD } from 'common/constants/newCardEmptyProp'

type InputImgPropsType = {
  rowQuestionImg: string
  rowAnswerImg: string
  updateCard: (newQuestion: string, newAnswer: string) => void
}
export const InputImg: React.FC<InputImgPropsType> = ({
  updateCard,
  rowQuestionImg,
  rowAnswerImg,
}) => {
  const cardRowQuestionImg = rowQuestionImg === NEW_CARD.EMPTY_IMG ? '' : rowQuestionImg
  const cardRowAnswerImg = rowQuestionImg === NEW_CARD.EMPTY_IMG ? '' : rowAnswerImg

  const formik = useFormik({
    initialValues: {
      questionImg: cardRowQuestionImg,
      answerImg: cardRowAnswerImg,
    },

    validate: values => {
      const errors = {} as FormikErrorsType

      if (!values.questionImg) {
        errors.questionImg = 'Required'
      }
      if (!values.answerImg) {
        errors.answerImg = 'Required'
      }

      return errors
    },

    onSubmit: values => {
      updateCard(values.questionImg, values.answerImg)
    },
  })

  const onChangeQuestImg = (newImg: string) => {
    setTimeout(() => {
      formik.setFieldValue('questionImg', newImg)
    }, 10)
    formik.setTouched({ ...formik.touched, questionImg: true })
  }

  const onChangeAnswerImg = (newImg: string) => {
    setTimeout(() => {
      formik.setFieldValue('answerImg', newImg)
    }, 10)
    formik.setTouched({ ...formik.touched, answerImg: true })
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputQuestion
        title={'Question:'}
        onChangeImg={onChangeQuestImg}
        formikTouched={formik.touched.questionImg}
        formikErrors={formik.errors.questionImg}
        currentImg={rowQuestionImg}
      />
      <InputQuestion
        title={'Answer:'}
        onChangeImg={onChangeAnswerImg}
        formikTouched={formik.touched.answerImg}
        formikErrors={formik.errors.answerImg}
        currentImg={rowAnswerImg}
      />
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

//Types

type FormikErrorsType = {
  questionImg: string
  answerImg: string
}
