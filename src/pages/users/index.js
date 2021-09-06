import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import { Form, Col, Button } from 'react-bootstrap'
import { api } from '../../services/api'
import { ModalError, ModalInfo } from '../../components/modals'
import { TableList } from '../../components/table'

export default function Users() {
    const columnsNames = ["Id", "Mail", "Name", "User Name", "Active", "Edit"];
    const columnValues = ["id", "mail", "name", "userName"];

    const [users, setUsers] = useState([])

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [active, setActive] = useState(true)

    const [tempLogin, setTempLogin] = useState("")

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const [actualize, setActualize] = useState(true)

    useEffect(() => {
        api.get('load-users').then(response => {
            setUsers(response.data)
        })

    }, [actualize])

    async function handleInsert(e) {
        e.preventDefault()

        const data = {
            id,
            name,
            mail,
            userName,
            password,
            active
        }

        try {

            await api.post("save-user", data)
            setTempLogin(data.userName)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);

        } catch (error) {
            setModalErrorMessage("Cannot insert user.")
            setErrorMessage("Message: " + error.response.data.message)
            setShowModalError(true)
        }
    }

    function handleEditClick(user) {
        setId(user.id)
        setName(user.name)
        setMail(user.mail)
        setActive(user.active)
        setPassword(user.password)
        setUserName(user.userName)
    }

    function clearFields() {
        setId("")
        setName("")
        setMail("")
        setPassword("")
        setActive(true)
        setUserName("")
    }

    return (
        <>
            <Menu />
            <Form style={{ margin: 20 }} onSubmit={handleInsert}>
                <Form.Row style={{ width: "480px" }}>
                    <Col md="5" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control required value={name} onChange={e => setName(e.target.value)} placeholder="Insert name" />
                    </Col>
                    <Col>
                        <Form.Label />
                        <Form.Check value={active} checked={active} onChange={e => setActive(e.target.checked)} style={{ margin: 15 }} type="switch" id="custom-switch" label="Active" />
                    </Col>
                </Form.Row>
                <Form.Row style={{ width: "480px" }}>
                    <Col md="5" >
                        <Form.Label>Login</Form.Label>
                        <Form.Control required value={userName} onChange={e => setUserName(e.target.value)} placeholder="Insert user name" />
                    </Col>
                    <Col md="5">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Insert password" />
                    </Col>
                </Form.Row>
                <Form.Row style={{ width: "480px" }}>
                    <Col md="10" >
                        <Form.Label>Mail</Form.Label>
                        <Form.Control required value={mail} onChange={e => setMail(e.target.value)} placeholder="Insert mail" />
                    </Col>
                </Form.Row>
                <Form.Row style={{ width: "480px" }} className="justify-content-between" style={{ width: '180px', marginTop: "15px" }}>
                    <Col>
                        <Button style={{ width: '80px' }} variant="outline-success" type="submit">Save</Button>
                    </Col>
                    <Col>
                        <Button style={{ width: '80px' }} variant="outline-danger" onClick={() => clearFields()} >Cancel</Button>
                    </Col>
                </Form.Row>
            </Form>

            <TableList
                listItems={users}
                columnsNames={columnsNames}
                columnValues={columnValues}
                updateFunction={handleEditClick}
                pageSize={5}
            />

            <ModalInfo
                show={showModalInsert}
                closeModalFunction={() => setShowModalInsert(false)}
                title="Insert User"
                message={"User " + tempLogin + " inserted."}
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