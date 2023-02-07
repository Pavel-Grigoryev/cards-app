import React from 'react'

import { useParams } from 'react-router-dom'

import s from './Dropdown.module.scss'
import { DeleteModal } from './Modal/DeleteModal/DeleteModal'
import { EditPackModal } from './Modal/EditPackModal/EditPackModal'

import { RequestStatusType } from 'app/app-reducer'
import { useAppDispatch, useAppSelector } from 'app/store'
import del from 'assets/images/Delete.png'
import edit from 'assets/images/Edit.png'
import learn from 'assets/images/Learn.png'
import { isLoading } from 'common/selectors/app-selector'
import { cardsTotalCountData } from 'common/selectors/cards-selector'
import { changePackCardsDeleteStatus } from 'features/PackPage/packPage-reducer'
import { deletePackTC, updatePackTC } from 'features/PacksList/packsList-reducer'

export const Dropdown = (props: DropdownPropsType) => {
  const dispatch = useAppDispatch()

  const packName = useAppSelector(state => state.cards.packName)
  const status = useAppSelector<RequestStatusType>(isLoading)
  const cardsTotalCount = useAppSelector(cardsTotalCountData)
  const isPrivate = useAppSelector(state => state.cards.packPrivate)
  const coverImg = useAppSelector(state => state.cards.packDeckCover)

  const { id } = useParams<string>()

  const updatePackHandler = (packId: string, packName: string, isPrivatePack: boolean) => {
    dispatch(updatePackTC({ cardsPack: { _id: packId, name: packName, private: isPrivatePack } }))
  }

  const deletePackHandler = (packId: string) => {
    dispatch(changePackCardsDeleteStatus({ packCardsDeleteStatus: 'loading' }))
    dispatch(deletePackTC(packId))
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
      <li>
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
      </li>
      <li>
        <DeleteModal
          title={'Delete'}
          name={packName}
          type={'pack'}
          disabledButton={status === 'loading'}
          deleteItem={() => deletePackHandler(id!)}
          img={del}
        />
      </li>
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
