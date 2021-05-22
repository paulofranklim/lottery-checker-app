import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import { Form, Col, Button } from 'react-bootstrap'
import { api } from '../../services/api'
import { ModalInfo } from '../../components/modals'
import { TableList } from '../../components/table'

export default function Bets() {
    const userId = sessionStorage.getItem('userId')

    const columnsNames = ["Id", "Game", "Prizes", "Numbers", "Active", "Edit"];
    const columnValues = ["id", "gameName", "accumulatedPrize", "numbers"];

    const [bets, setBets] = useState([])
    const [tempBet, setTempBet] = useState("")
    const [games, setGames] = useState([])
    const [gameName, setGameName] = useState()

    const [id, setId] = useState(0)
    const [gameId, setGameId] = useState("")
    const [accumulatedPrize, setAccumulatedPrize] = useState("")
    const [numbers, setNumbers] = useState("")
    const [active, setActive] = useState(true)

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [msgError, setMsgError] = useState("")

    const [actualize, setActualize] = useState(true)

    useEffect(() => {
        api.get('load-games').then(response => {
            setGames(response.data)
        })

        api.get('load-bets').then(response => {
            response.data.forEach(data => {
                games.forEach(game => {
                    if (game.id === data.gameId) {
                        data.gameName = game.name
                    }
                })
            })
            setBets(response.data)
        })

    }, [actualize, games])

    async function handleInsert(e) {
        e.preventDefault()

        const data = {
            id,
            gameId,
            userId,
            accumulatedPrize,
            numbers,
            active
        }

        try {

            await api.post("save-bet", data)
            setTempBet(data.id)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);

        } catch (error) {
            setMsgError("Cannot insert bet. " + error)
            setShowModalError(true)
        }
    }

    function handleEditClick(bet) {
        setId(bet.id)
        setGameId(bet.gameId)
        setAccumulatedPrize(bet.accumulatedPrize)
        setNumbers(bet.numbers)
        setActive(bet.active)
        games.forEach(game => {
            if (game.id === bet.gameId) {
                setGameName(game.name)

            }
        })
    }

    function clearFields() {
        setId("")
        setGameId("")
        setGames([games])
        setGameName("")
        setAccumulatedPrize("")
        setNumbers("")
        setActive(true)
        setActualize(!actualize);
    }

    function handleGameId(gameId) {
        games.forEach(game => {
            if (game.name === gameId) {
                setGameName(game.name)
                setGameId(game.id)
            }
        })
    }

    return (
        <div>
            <Menu />
            <Form style={{ margin: 20 }} onSubmit={handleInsert}>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Game</Form.Label>
                        <Form.Control as="select" value={gameName} required onChange={e => handleGameId(e.target.value)} placeholder="Insert name">
                            <option>Select a game</option>
                            {games.map(game => (
                                <option>{game.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label />
                        <Form.Check value={active} checked={active} onChange={e => setActive(e.target.checked)} style={{ margin: 15 }} type="switch" id="custom-switch" label="Active" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Numbers</Form.Label>
                        <Form.Control required value={numbers} onChange={e => setNumbers(e.target.value)} placeholder="Insert login" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Accumulated Prizes</Form.Label>
                        <Form.Control required value={accumulatedPrize} onChange={e => setAccumulatedPrize(e.target.value)} placeholder="Insert login" />
                    </Form.Group>
                </Form.Row>
                <Button style={{ width: '80px' }} variant="outline-success" type="submit">Save</Button>
                <Button style={{ width: '80px', marginLeft: 10 }} variant="outline-danger" onClick={() => clearFields()} >Cancel</Button>
            </Form>

            <TableList
                listItems={bets}
                columnsNames={columnsNames}
                columnValues={columnValues}
                updateFunction={handleEditClick}
                pageSize={7}
            />

            <ModalInfo
                show={showModalInsert}
                closeModalFunction={() => setShowModalInsert(false)}
                title="Insert Bet"
                message={"Bet " + tempBet + " inserted."}
            />

            <ModalInfo
                show={showModalError}
                closeModalFunction={() => setShowModalError(false)}
                title="Error!"
                message={msgError}
            />
        </div>
    );
}