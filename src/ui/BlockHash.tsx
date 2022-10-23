import React from 'react'

import { Anchor } from 'grommet'
import {AnchorLink} from './AnchorLink'

// @ts-ignore
export const BlockHash = ({ hash }) => {
  const link = `/`
  return <AnchorLink to={link} label={hash} />
}