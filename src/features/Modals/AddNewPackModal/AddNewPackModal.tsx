import React, { FC, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import { InputQuestion } from '../../../common/components/InputQuestion/InputQuestion'
import styles from '../../../common/styles/errors.module.scss'
import { addNewPackSchema } from '../../../common/utils/validationSchema'

import s from './AddNewPackModal.module.scss'

import { SuperButton } from 'common/components/SuperButton/SuperButton'
import { SuperModal } from 'common/components/SuperModal/SuperModal'

type AddNewPackModalPropsType = {
  title: string
  createNewPackHandler: (packName: string, isPrivatePack: boolean, deckCover: string) => void
}

export const AddNewPackModal: FC<AddNewPackModalPropsType> = ({ title, createNewPackHandler }) => {
  const [open, setOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      cover: '',
      packName: '',
      isPrivatePack: false,
    },

    validationSchema: addNewPackSchema,

    onSubmit: values => {
      console.log(values)
      createNewPackHandler(values.packName, values.isPrivatePack, values.cover)
      setOpen(false)
    },
  })

  const onChangeImg = (newImg: string) => {
    console.log(newImg)
    formik.setFieldValue('cover', newImg)
  }

  return (
    <SuperModal
      title={title}
      modalHeader={'Add new pack'}
      open={open}
      handleOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
    >
      <form onSubmit={formik.handleSubmit} className={s.wrapper}>
        <div className={s.inputs}>
          <FormControl>
            <InputQuestion title={'Cover:'} onChangeImg={onChangeImg} />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '15px' }}>
            <InputLabel color={'secondary'}>Name pack</InputLabel>
            <Input
              id="standard-basic"
              type={'text'}
              color={'secondary'}
              placeholder={'Name Pack'}
              {...formik.getFieldProps('packName')}
            />
            {formik.touched.packName && formik.errors.packName && (
              <div className={styles.errorText}>{formik.errors.packName}</div>
            )}
          </FormControl>
          <FormControlLabel
            sx={{ alignSelf: 'flex-start' }}
            label={'Private pack'}
            control={
              <Checkbox
                color={'secondary'}
                checked={formik.values.isPrivatePack}
                {...formik.getFieldProps('isPrivatePack')}
              />
            }
          />
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
    </SuperModal>
  )
}
