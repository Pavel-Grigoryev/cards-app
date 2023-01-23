import React from 'react'

import { ReturnLink } from '../../common/components/ReturnLink/ReturnLink'
import { PATH } from '../../common/routes/routes'

export const LearnPage = () => {
  return (
    <div>
      <ReturnLink path={PATH.PACKS_LIST} title={'Back to Packs List'} />
      <div>Learn Pack Name</div>
    </div>
  )
}
