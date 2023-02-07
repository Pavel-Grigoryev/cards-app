import React, { FC, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import { useFormik } from 'formik'

import styles from '../../../../styles/errors.module.scss'
import { addNewPackSchema } from '../../../../utils/validationSchema'
import { InputQuestion } from '../../../InputQuestion/InputQuestion'
import { ModalWin } from '../ModalWin'

import s from './EditPackModal.module.scss'

import { SuperButton } from 'common/components/SuperButton/SuperButton'

type EditPackModalPropsType = {
  title: any
  updatePack: (packName: string, isPrivatePack: boolean, cover: string) => void
  currentPackName: string
  isPrivate: boolean
  disabledButton: boolean
  img: string
  coverImg: string
  handleTooltipClose: () => void
}

export const EditPackModal: FC<EditPackModalPropsType> = ({
  title,
  updatePack,
  disabledButton,
  currentPackName,
  isPrivate,
  img,
  coverImg,
  handleTooltipClose,
}) => {
  const [open, setOpen] = useState(false)

  const formik = useFormik({
    initialValues: {
      packName: currentPackName,
      isPrivatePack: isPrivate,
      cover: coverImg,
    },

    validationSchema: addNewPackSchema,

    onSubmit: values => {
      updatePack(values.packName, values.isPrivatePack, values.cover)
      setOpen(false)
      handleTooltipClose()
    },
  })

  const onChangeImg = (newImg: string) => {
    formik.setFieldValue('cover', newImg)
  }

  return (
    <ModalWin
      title={title}
      open={open}
      modalHeader={'Edit pack'}
      handleOpen={() => setOpen(true)}
      handleClose={() => setOpen(false)}
      disabledButton={disabledButton}
      img={img}
    >
      <form onSubmit={formik.handleSubmit} className={s.wrapper}>
        <div className={s.inputs}>
          <FormControl>
            <InputQuestion title={'Cover:'} onChangeImg={onChangeImg} currentImg={coverImg} />
          </FormControl>
          <FormControl fullWidth sx={{ margin: '20px 0 15px' }}>
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
    </ModalWin>
  )
}
