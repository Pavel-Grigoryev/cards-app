import React, { FC, useCallback, useState } from 'react'

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useFormik } from 'formik'

import s from './AddNewCardModal.module.scss'

import { InputQuestion } from 'common/components/InputQuestion/InputQuestion'
import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperModal } from 'common/components/SuperModal/SuperModal'
import styles from 'common/styles/errors.module.scss'
import { addNewCardSchema } from 'common/utils/validationSchema'

type AddNewCardModalPropsType = {
  title: any
  createNewCardHandler: (newQuestion: string, newAnswer: string, mode: ModeType) => void
}

export const AddNewCardModal: FC<AddNewCardModalPropsType> = ({ title, createNewCardHandler }) => {
  const [mode, setMode] = useState<ModeType>('text')
  const [open, setOpen] = useState(false)

  const handleChange = (e: SelectChangeEvent) => {
    setMode(e.target.value as ModeType)
  }

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },

    validationSchema: addNewCardSchema,

    onSubmit: values => {
      createNewCardHandler(values.question, values.answer, mode)
      formik.resetForm()
      setOpen(false)
    },
  })

  const onChangeQuestImg = useCallback((newImg: string) => {
    formik.setFieldValue('question', newImg)
  }, [])

  const onChangeAnswerImg = useCallback((newImg: string) => {
    formik.setFieldValue('answer', newImg)
  }, [])

  return (
    <SuperModal
      title={title}
      modalHeader={'Add new card'}
      open={open}
      handleOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
    >
      <div className={s.wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <div className={s.inputs}>
            <FormControl fullWidth>
              <InputLabel color={'secondary'} id="demo-simple-select-label">
                Choose a question format
              </InputLabel>
              <Select
                color={'secondary'}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mode}
                label="Choose a question format"
                onChange={handleChange}
              >
                <MenuItem value={'text'}>Text</MenuItem>
                <MenuItem value={'image'}>Image</MenuItem>
              </Select>
            </FormControl>
            {mode === 'text' ? (
              <>
                <FormControl fullWidth sx={{ marginBottom: '15px' }}>
                  <InputLabel color={'secondary'}>Question</InputLabel>
                  <Input
                    id="standard-basic"
                    type={'text'}
                    color={'secondary'}
                    placeholder={'Question'}
                    {...formik.getFieldProps('question')}
                  />
                  {formik.touched.question && formik.errors.question && (
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
                  {formik.touched.answer && formik.errors.answer && (
                    <div className={styles.errorText}>{formik.errors.answer}</div>
                  )}
                </FormControl>
              </>
            ) : (
              <div className={s.imageInputs}>
                <InputQuestion
                  title={'Question:'}
                  onChangeImg={onChangeQuestImg}
                  formikTouched={formik.touched.question}
                  formikErrors={formik.errors.question}
                />
                <InputQuestion
                  title={'Answer:'}
                  onChangeImg={onChangeAnswerImg}
                  formikTouched={formik.touched.answer}
                  formikErrors={formik.errors.answer}
                />
              </div>
            )}
          </div>
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
      </div>
    </SuperModal>
  )
}

//Types

export type ModeType = 'text' | 'image'
