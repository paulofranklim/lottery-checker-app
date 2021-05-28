import React from 'react'
import { Button } from 'react-bootstrap'

export const GameButtons = (props) => {

  const { size, numbers, setNumbers } = props
  let vNumbers = numbers.length === 0 ? [] : numbers.split(",")

  const buttons = [];
  for (let i = 1; i <= size; i++) {
    let btn = <Button key={i} value={i} style={{ backgroundColor: vNumbers.includes(i + "") ? "gray" : "#0d6efd" }} onClick={e => handleNumbers(e)}>{i}</Button>
    buttons.push(btn)
  }

  function handleNumbers(e) {
    const btnNumber = e.target.value

    if (!vNumbers.includes(btnNumber)) {
      vNumbers.push(btnNumber)
    } else {
      vNumbers = vNumbers.filter(item => item !== btnNumber)
    }

    setNumbers(vNumbers.toString())
  }

  return (
    <>
      {
        buttons.map(button => (
          button
        ))
      }
    </>
  )
}
