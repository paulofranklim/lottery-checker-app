import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import { api } from '../../services/api'
import { ModalInfo, ModalError } from '../../components/modals'
import { TableList } from '../../components/table'
import { GameButtons } from '../../components/gamebuttons'
import NumberFormat from 'react-number-format';

export default function Bets() {
    const userId = sessionStorage.getItem('userId')

    const columnsNames = ["Id", "Game", "Prizes", "Numbers", "Last Check", "Active", "Edit"];
    const columnValues = ["id", "gameName", "formattedAccumulatedPrize", "numbers", "lastCheck"];

    const [bets, setBets] = useState([])

    const [tempGame, setTempGame] = useState("")
    const [games, setGames] = useState([])
    const [gameName, setGameName] = useState("")


    const [id, setId] = useState(0)
    const [gameId, setGameId] = useState("")
    const [accumulatedPrize, setAccumulatedPrize] = useState("")
    const [tempAccumulatedPrize, setTempAccumulatedPrize] = useState("")
    const [numbers, setNumbers] = useState("")
    const [lastCheck, setLastCheck] = useState("")
    const [active, setActive] = useState(true)

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [actualize, setActualize] = useState(true)

    useEffect(() => {
        api.get('load-games').then(games => {
            setGames(games.data)
        })

    }, [actualize])

    useEffect(() => {
        api.get('load-bets/' + userId).then(bets => {
            bets.data.forEach(bet => {
                const formattedAccumulatedPrize = <NumberFormat
                    value={bet.accumulatedPrize}
                    displayType={'text'}
                    prefix={'$ '}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
                bet.formattedAccumulatedPrize = formattedAccumulatedPrize
                games.forEach(game => {
                    if (game.id === bet.gameId) {
                        bet.gameName = game.name
                    }
                })
            })
            setBets(bets.data)
        })
    }, [games])

    async function handleInsert(e) {
        e.preventDefault()

        const data = {
            id,
            gameId,
            userId,
            accumulatedPrize,
            numbers,
            lastCheck,
            active
        }

        try {
            await api.post("save-bet", data)
            setShowModalInsert(true);
            clearFields();

        } catch (error) {
            setModalErrorMessage("Cannot insert bet.")
            setErrorMessage("Message: " + error.response.data.message)
            setShowModalError(true)
        }
    }

    function handleEditClick(bet) {
        setId(bet.id)
        setGameId(bet.gameId)
        setAccumulatedPrize(bet.accumulatedPrize)
        setNumbers(bet.numbers)
        setLastCheck(bet.lastCheck)
        setActive(bet.active)
        handleAccumulatePrize(bet.accumulatedPrize)
        games.forEach(game => {
            if (game.id === bet.gameId) {
                setGameName(game.name)
                setTempGame(game)
            }
        })
    }

    function clearFields() {
        setId("")
        setGameId("")
        setGames([...games])
        setGameName("")
        setAccumulatedPrize("")
        setTempAccumulatedPrize("")
        setNumbers("")
        setActive(true)
        setTempGame()
        setLastCheck("")
        setActualize(!actualize);
    }

    function handleGameId(gameId) {
        setNumbers("")
        games.forEach(game => {
            if (game.name === gameId) {
                setGameName(game.name)
                setGameId(game.id)
                setTempGame(game)
            }
        })
    }

    function handleAccumulatePrize(e) {
        const value = e.toString()
        //Replacing to save with point
        setAccumulatedPrize(value.replace(",", "."))
        //Replacing to show with coma
        setTempAccumulatedPrize(value.replace(".", ","))
    }

    return (
        <>
            <Menu />
            <Form style={{ margin: 20 }} onSubmit={handleInsert}>
                <Form.Row style={{ width: "480px" }}>
                    <Col md="6" >
                        <Form.Label>Game</Form.Label>
                        <Form.Control as="select" value={gameName} required onChange={e => handleGameId(e.target.value)} >
                            <option>Select a game</option>
                            {games.map(game => (
                                <option key={game.name}>{game.name}</option>
                            ))}
                        </Form.Control>
                    </Col>
                    <Col>
                        <Form.Label />
                        <Form.Check value={active} checked={active} onChange={e => setActive(e.target.checked)} style={{ margin: 15 }} type="switch" id="custom-switch" label="Active" />
                    </Col>
                </Form.Row>

                <Form.Row style={{ width: "480px" }}>
                    {tempGame ? <GameButtons numbers={numbers} setNumbers={setNumbers} tempGame={tempGame} /> : null}
                </Form.Row>
                <Form.Label>Accumulated Prizes</Form.Label>
                <Form.Row style={{ width: "480px" }}>
                    <InputGroup as={Col} md="4">
                        <InputGroup.Prepend>
                            <InputGroup.Text>$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control required value={tempAccumulatedPrize} onChange={e => handleAccumulatePrize(e.target.value)} placeholder="Total prizes" />
                    </InputGroup>
                </Form.Row>
                <Form.Row className="justify-content-between" style={{ width: '180px', marginTop: "15px" }}>
                    <Col>
                        <Button style={{ width: '80px' }} variant="outline-success" type="submit">Save</Button>
                    </Col>
                    <Col>
                        <Button style={{ width: '80px' }} variant="outline-danger" onClick={() => clearFields()} >Cancel</Button>
                    </Col>
                </Form.Row>
            </Form>

            <TableList
                listItems={bets}
                columnsNames={columnsNames}
                columnValues={columnValues}
                updateFunction={handleEditClick}
                pageSize={5}
            />

            <ModalInfo
                show={showModalInsert}
                closeModalFunction={() => setShowModalInsert(false)}
                title="Insert Bet"
                message={"Bet inserted."}
            />

            <ModalError
                show={showModalError}
                closeModalFunction={() => setShowModalError(false)}
                title="Error!"
                modalMessage={modalErrorMessage}
                errorMessage={errorMessage}
            />
        </>
    );
}