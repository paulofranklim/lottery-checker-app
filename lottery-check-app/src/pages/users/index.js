import React, { useState, useEffect } from 'react'
import Menu from '../../components/menu'
import { Form, Col, Pagination, Button } from 'react-bootstrap'
import { api } from '../../services/api'
import { ModalInfo, ModalActionConfirmation } from '../../components/modals'
import { TableList } from '../../components/table'

export default function Users() {
    const columnsNames = ["Id", "Mail", "Name", "Remove"];
    const columnValues = ["id", "mail", "name"];

    const [users, setUsers] = useState([])

    const [id, setId] = useState(0)
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [active, setActive] = useState(true)

    const [tempId, setTempId] = useState("")
    const [tempLogin, setTempLogin] = useState("")

    const [showModalInsert, setShowModalInsert] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalError, setShowModalError] = useState(false);
    const [msgError, setMsgError] = useState("")

    const [activePage, setActivePage] = useState(1)
    const [pages, setPages] = useState([])
    const [actualize, setActualize] = useState(true)

    useEffect(() => {
        api.get('load-users').then(response => {
            const total = response.headers['x-total-count'];

            let tempPages = []
            for (let i = total; i > 0; i = i - 5) {
                tempPages.push(<Pagination.Item key={tempPages.length} active={tempPages.length + 1 === activePage}>{tempPages.length + 1}</Pagination.Item>)
            }
            setPages(tempPages)
            setUsers(response.data)
        })

    }, [actualize])

    async function handleInsert(e) {
        e.preventDefault()

        const data = {
            id,
            name,
            mail,
            password
        }

        try {

            await api.post("save-user", data)
            setTempLogin(data.mail)
            setShowModalInsert(true);
            clearFields();
            setActualize(!actualize);

        } catch (error) {
            setMsgError("Cannot insert user. " + error)
            setShowModalError(true)
        }
    }

    async function handleDelete(e) {
        e.preventDefault()
        try {
            await api.delete('users/' + tempId)
            clearFields();
            setActualize(!actualize);
            setShowModalDelete(false);
        } catch (error) {
            setMsgError("Cannot delete user. " + error)
            setShowModalError(true)
        }
    }

    function handleEditClick(user) {
        setId(user.id)
        setName(user.name)
        setMail(user.mail)
        setActive(true)
        setPassword(user.password)
    }

    function handleFilter(e) {
        const num = e.target.text
        if (num) {
            setActivePage(num)
            setActualize(!actualize);
        }
    }

    function prepareToDelete(user) {
        setTempId(user.id);
        setTempLogin(user.mail)
        setShowModalDelete(true);
    }

    function clearFields() {
        setId("")
        setName("")
        setMail("")
        setPassword("")
        setActive(true)
    }

    return (
        <div>
            <Menu />
            <Form style={{ margin: 20 }} onSubmit={handleInsert}>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Name</Form.Label>
                        <Form.Control required value={name} onChange={e => setName(e.target.value)} placeholder="Insert name" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label />
                        <Form.Check value={active} checked={active} onChange={e => setActive(e.target.checked)} style={{ margin: 15 }} type="switch" id="custom-switch" label="Active" />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="2" >
                        <Form.Label>Login</Form.Label>
                        <Form.Control required value={mail} onChange={e => setMail(e.target.value)} placeholder="Insert login" />
                    </Form.Group>
                    <Form.Group as={Col} md="2">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Insert password" />
                    </Form.Group>
                </Form.Row>
                <Button style={{ width: '80px' }} variant="outline-success" type="submit">Save</Button>
                <Button style={{ width: '80px', marginLeft: 10 }} variant="outline-danger" onClick={() => clearFields()} >Cancel</Button>
            </Form>

            <Pagination onClick={handleFilter} style={{ marginBottom: 0, marginLeft: '25%' }} size="sm" >
                {pages}
            </Pagination>

            <TableList
                listItens={users}
                columnsNames={columnsNames}
                columnValues={columnValues}
                updateFunction={handleEditClick}
                deleteFunction={prepareToDelete}
            />

            <ModalActionConfirmation
                show={showModalDelete}
                closeModalFunction={() => setShowModalDelete(false)}
                title="Delete User"
                message={"Are you sure? Confirm delete user '" + tempLogin + "'?"}
                actionName="Delete"
                actionFunction={handleDelete}
            />

            <ModalInfo
                show={showModalInsert}
                closeModalFunction={() => setShowModalInsert(false)}
                title="Insert User"
                message={"User " + tempLogin + " inserted."}
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