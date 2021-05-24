import React from 'react'
import { Button } from 'react-bootstrap'

export const GameButtons = (props) => {

  const { size } = props

  const buttons = [];
  for (let i = 0; i <= size; i++) {
    buttons.push(i)
  }

  return (
    <>
      {
        buttons.map(number => (
          <Button>{number}</Button>
        ))
      }
    </>
  )
}
