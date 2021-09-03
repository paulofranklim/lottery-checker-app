import React from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap'

export const ModalInfo = (props) => {
    const { show, closeModalFunction, title, message } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalActionConfirmation = (props) => {
    const { show, closeModalFunction, title, message, actionName, actionFunction } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={actionFunction}>
                        {actionName}
                    </Button>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalError = (props) => {
    const { show, closeModalFunction, title, modalMessage, errorMessage } = props

    return (
        <div>
            <Modal show={show} onHide={() => closeModalFunction()} >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {modalMessage}
                    </p>
                    <p>
                        {errorMessage}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModalFunction()}>
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export const ModalNewUser = (props) => {
    const { show, title, saveUserFunction, closeModalFunction } = props
    return (
        <Modal show={show} onHide={() => closeModalFunction()} centered>
            <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ margin: 20 }} onSubmit={saveUserFunction}>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Name</Form.Label>
                            <Form.Control required placeholder="Insert name" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" >
                            <Form.Label>Login</Form.Label>
                            <Form.Control required placeholder="Insert user name" />
                        </Form.Group>
                        <Form.Group as={Col} md="6">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Insert password" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label>Mail</Form.Label>
                            <Form.Control required placeholder="Insert mail" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => saveUserFunction()}>
                    Save
                </Button>
                <Button variant="danger" onClick={() => closeModalFunction()}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export const ModalResetPassword = (props) => {
    const { show, title, sendFunction, closeModalFunction } = props
    return (
        <Modal show={show} onHide={() => closeModalFunction()} centered>
            <Modal.Header >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={sendFunction}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>User e-mail</Form.Label>
                            <Form.Control required placeholder="Insert your mail to send a reset link" />
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => sendFunction()}>Send</Button>
                <Button variant="danger" onClick={() => closeModalFunction()}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}