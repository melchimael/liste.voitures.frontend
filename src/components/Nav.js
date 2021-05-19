import React, { useState } from 'react'
import {Button, Row, Col, Container, Modal, Form} from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons';
import './Styles/Nav.css'
function Nav() {
    const [showDeconnect, setshowDeconnect] = useState(false)
    const [showModalConnection, setshowModalConnection] = useState(false)
    const [modalInscription, setmodalInscription] = useState(false)
    return (
        <div className="shadow">
           <Modal show={modalInscription} onHide={()=>setmodalInscription(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>S'inscrire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control placeholder="Entrer le nom d'utilisateur" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                      </Form.Group>
                    </Form>
                    <p className="text-danger">Veuillez remplir tous les champs!</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setmodalInscription(false)}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={()=>setmodalInscription(false)}>
                        S'inscrire
                    </Button>
                    </Modal.Footer>
          </Modal>
          <Modal show={showModalConnection} onHide={()=>setshowModalConnection(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Se connecter</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control placeholder="Entrer le nom d'utilisateur" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" placeholder="Mot de passe" />
                      </Form.Group>
                    </Form>
                    <p className="text-danger">Veuillez remplir tous les champs!</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setshowModalConnection(false)}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={()=>setshowModalConnection(false)}>
                        S'inscrire
                    </Button>
                    </Modal.Footer>
          </Modal>
          <Modal show={showDeconnect} onHide={()=>setshowDeconnect(false)}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title>Veuillez vous indentifier</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>Voulez vous vramiment vous déconnecter?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setshowDeconnect(false)}>
                        Annuler
                    </Button>

                    <Button variant="danger" onClick={()=>setshowDeconnect(false)}>
                        Se déconnecter
                    </Button>
                    </Modal.Footer>
            </Modal>
          <Container fluid>
            <Row>
              <Col className="navigation bg-dark shadow p-3 mb-5 bg-body">
                <div className="d-flex align-items-center">
                  <Icon.PersonCircle color="#fff" size={25}/>
                  <span className="text-white ml-2">Melchimael Randriamiadana</span>
                </div>
                <div>
                  <Button variant="danger" onClick={()=>setshowDeconnect(true)}>
                      <Icon.GearFill className="mr-1" color="#fff"/>
                        Se déconnecter
                  </Button>
                  <Button onClick={()=>setmodalInscription(true)} variant="success" className="ml-2">Inscription</Button>
                  
                  <Button onClick={()=>setshowModalConnection(true)} variant="info" className="ml-2">Se connecter 
                  <Icon.BoxArrowInLeft className="ml-2"/>
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Nav
