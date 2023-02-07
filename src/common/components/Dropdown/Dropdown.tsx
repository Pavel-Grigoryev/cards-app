import React from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { RequestStatusType } from '../../../app/app-reducer'
import { useAppDispatch, useAppSelector } from '../../../app/store'
import { deletePackTC, updatePackTC } from '../../../features/PacksList/packsList-reducer'
import { PATH } from '../../routes/routes'
import { isLoading } from '../../selectors/app-selector'
import { cardsTotalCountData } from '../../selectors/cards-selector'

import s from './Dropdown.module.scss'
import { DeleteModal } from './Modal/DeleteModal/DeleteModal'
import { EditPackModal } from './Modal/EditPackModal/EditPackModal'

import del from 'assets/images/Delete.png'
import edit from 'assets/images/Edit.png'
import learn from 'assets/images/Learn.png'

export const Dropdown = (props: DropdownPropsType) => {
  const dispatch = useAppDispatch()

  const packName = useAppSelector(state => state.cards.packName)
  const status = useAppSelector<RequestStatusType>(isLoading)
  const cardsTotalCount = useAppSelector(cardsTotalCountData)
  const isPrivate = useAppSelector(state => state.cards.packPrivate)
  const coverImg = useAppSelector(state => state.cards.packDeckCover)

  const navigate = useNavigate()

  const { id } = useParams<string>()

  const updatePackHandler = (packId: string, packName: string, isPrivatePack: boolean) => {
    dispatch(updatePackTC({ cardsPack: { _id: packId, name: packName, private: isPrivatePack } }))
  }

  const deletePackHandler = (packId: string) => {
    dispatch(deletePackTC(packId))
    // navigate(PATH.PACKS_LIST)
  }

  const learnPack = () => {
    if (cardsTotalCount) {
      props.learn(id!)
    } else {
      alert('There are no cards in this pack!')
    }
  }

  return (
    <ul className={s.block}>
      <EditPackModal
        title={'Edit'}
        disabledButton={status === 'loading'}
        currentPackName={packName}
        isPrivate={isPrivate}
        coverImg={coverImg}
        updatePack={(packName: string, isPrivatePack: boolean) => {
          updatePackHandler(id!, packName, isPrivatePack)
        }}
        img={edit}
      />

      <DeleteModal
        title={'Delete'}
        name={packName}
        type={'pack'}
        disabledButton={status === 'loading'}
        deleteItem={() => deletePackHandler(id!)}
        img={del}
      />
      <li className={s.linkBlock}>
        <button className={s.button} onClick={() => learnPack()}>
          <img className={s.image} src={learn} alt="" />
          <span className={s.title}>Learn</span>
        </button>
      </li>
    </ul>
  )
}

type DropdownPropsType = {
  learn: (packId: string) => void
}