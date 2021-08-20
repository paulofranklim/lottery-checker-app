import React from 'react'
import { Button, Jumbotron, Container, Row } from 'react-bootstrap'

export const GameButtons = (props) => {

  const { numbers, setNumbers, tempGame } = props

  const size = tempGame.lastPossibleNumber
  const qtyMin = tempGame.numberMin
  const qtyMax = tempGame.numberMax

  let vNumbers = numbers.length === 0 ? [] : numbers.split(",")

  const buttons = [];
  for (let i = 1; i <= size; i++) {
    let btn = <Button key={i} size="sm" value={i} style={{ textAlign: "center", width: "35px", margin: 2, backgroundColor: vNumbers.includes(i + "") ? "#0d6efd" : "gray" }} onClick={e => handleNumbers(e)}>{i}</Button>
    buttons.push(btn)
  }

  function handleNumbers(e) {
    const btnNumber = e.target.value

    if (!vNumbers.includes(btnNumber)) {
      vNumbers.push(btnNumber)
    } else {
      vNumbers = vNumbers.filter(item => item !== btnNumber)
    }
    setNumbers(vNumbers.sort(comparToOrderNumbers).toString())
  }

  function comparToOrderNumbers(a, b) {
    return a - b;
  }

  return (
    <>
      <Jumbotron fluid style={{ width: "450px" }}>
        <Container >
          <Row className="justify-content-md-center">
            <h5>Select the bet numbers</h5>
          </Row>
          {
            buttons.map(button => (
              button
            ))
          }
          <Row style={{ marginLeft: "5px", marginTop: "15px" }}>
            <span style={{ marginLeft: "5px", backgroundColor: "gray", width: "10px", height: "10px" }} />
            <span style={{ marginLeft: "5px", fontSize: 12 }}>Available</span>
            <span style={{ marginLeft: "5px", backgroundColor: "#0d6efd", width: "10px", height: "10px" }} />
            <span style={{ marginLeft: "5px", fontSize: 12 }}>Selected</span>
          </Row>
          <Row style={{ marginLeft: "5px" }}>
            <span style={{ marginLeft: "5px", fontSize: 12 }}>*Minimum {qtyMin} numbers</span>
            <span style={{ marginLeft: "5px", fontSize: 12 }}> and maximum {qtyMax} numbers</span>
          </Row>
        </Container>
      </Jumbotron>
    </>
  )
}
