import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import { Form, Col, Button } from 'react-bootstrap'
import { api } from '../../services/api'
import { ModalInfo, ModalError } from '../../components/modals'
import { TableList } from '../../components/table'

export default function Games() {
    const columnsNames = ["Id", "Game", "Min", "Max", "Last Number", "Last Draw", "Active", "Edit"];
    const columnValues = ["id", "name", "numberMin", "numberMax", "lastPossibleNumber", "lastDraw"];

    const [games, setGames] = useState([])

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [numberMin, setNumberMin] = useState("")
    const [numberMax, setNumberMax] = useState("")
    const [lastPossibleNumber, setLastPossibleNumber] = useState("")
    const [lastDraw, setLastDraw] = useState("")
    const [active, setActive] = useState(true)

    const [tempGame, setTempGame] = useState("")

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [actualize, setActualize] = useState(true)

    useEffect(() => {
        api.get('load-games').then(response => {
            setGames(response.data)
        })

    }, [actualize])

    async function handleInsert(e) {
        e.preventDefault()

        const data = {
            id,
            name,
            numberMin,
            numberMax,
            lastPossibleNumber,
            lastDraw,
            active
        }

        try {
            await api.post("save-game", data)
            setTempGame(data.id)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);

        } catch (error) {
            setModalErrorMessage("Cannot insert game.")
            setErrorMessage(error.response.data.message)
            setShowModalError(true)
        }
    }

    function handleEditClick(game) {
        setId(game.id)
        setName(game.name)
        setNumberMin(game.numberMin)
        setNumberMax(game.numberMax)
        setLastPossibleNumber(game.lastPossibleNumber)
        setLastDraw(game.lastDraw)
        setActive(game.setActive)
    }

    function clearFields() {
        setId("")
        setName("")
        setNumberMin("")
        setNumberMax("")
        setLastPossibleNumber("")
        setLastDraw("")
        setActive(true)
    }

    return (
        <div>
            <Menu />
            <Form style={{ margin: 20 }} onSubmit={handleInsert}>
                <Form.Row as={Col} md="3">
                    <Col xs={5}>
                        <Form.Label>Game</Form.Label>
                        <Form.Control required value={name} onChange={e => setName(e.target.value)} placeholder="Insert game name" />
                    </Col>
                    <Col>
                        <Form.Label />
                        <Form.Check value={active} checked={active} onChange={e => setActive(e.target.checked)} style={{ margin: 15 }} type="switch" id="custom-switch" label="Active" />
                    </Col>
                </Form.Row>
                <Form.Row as={Col} md="1">
                    <Col>
                        <Form.Group >
                            <Form.Label>Last Draw</Form.Label>
                            <Form.Control required value={lastDraw} onChange={e => setLastDraw(e.target.value)} placeholder="Last draw" />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Row as={Col} md="3">
                    <Col xs={2}>
                        <Form.Group >
                            <Form.Label>Min</Form.Label>
                            <Form.Control required value={numberMin} onChange={e => setNumberMin(e.target.value)} placeholder="Min" />
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group >
                            <Form.Label>Max</Form.Label>
                            <Form.Control required value={numberMax} onChange={e => setNumberMax(e.target.value)} placeholder="Max" />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group >
                            <Form.Label>Last Possible</Form.Label>
                            <Form.Control required value={lastPossibleNumber} onChange={e => setLastPossibleNumber(e.target.value)} placeholder="Last Possible" />
                        </Form.Group>
                    </Col>
                </Form.Row>

                <Form.Row as={Col} md="2">
                    <Button style={{ width: '80px', marginLeft: 5 }} variant="outline-success" type="submit">Save</Button>
                    <Button style={{ width: '80px', marginLeft: 5 }} variant="outline-danger" onClick={() => clearFields()} >Cancel</Button>
                </Form.Row>

            </Form>

            <TableList
                listItems={games}
                columnsNames={columnsNames}
                columnValues={columnValues}
                updateFunction={handleEditClick}
                pageSize={5}
            />

            <ModalInfo
                show={showModalInsert}
                closeModalFunction={() => setShowModalInsert(false)}
                title="Insert Game"
                message={"Game " + tempGame + " inserted."}
            />

            <ModalError
                show={showModalError}
                closeModalFunction={() => setShowModalError(false)}
                title="Error!"
                modalMessage={modalErrorMessage}
                errorMessage={errorMessage}
            />
        </div>
    );
}