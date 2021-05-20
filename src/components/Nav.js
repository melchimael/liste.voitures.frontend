import React, { useEffect, useState } from 'react'
import {Button, Row, Col, Container, Modal, Form, Spinner} from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons';
import './Styles/Nav.css'
import axios from 'axios'
import serverInfo from  './config/serverInfo'
import { LogInStore } from './store/store';
function Nav() {
    const [loginState, setloginState] = useState(false)

    const [infoInscription, setinfoInscription] = useState({nom:"",mdp:""})
    const [isValidInscription, setisValidInscription] = useState(true)
    const [modalInscription, setmodalInscription] = useState(false)
    
    const [infoLogin, setinfoLogin] = useState({nom:"",mdp:""})
    const [isValidLogin, setisValidLogin] = useState(true)
    const [showModalConnection, setshowModalConnection] = useState(false)
    
    const [showDeconnect, setshowDeconnect] = useState(false)

    const handleInscription = (type, value)=>{
          setinfoInscription({...infoInscription,[type]:value})
          // console.log(infoInscription)
    }
    const handleLogin = (type, value)=>{
        setinfoLogin({...infoLogin,[type]:value})
        // console.log(infoInscription)
    }

    const disconnect = ()=>{
        setisLoading(true)
        LogInStore.dispatch({type:"MAJ",login:false});
        axios.post(serverInfo+"/disconnect",{},{withCredentials:true}).then(response=>{
          setisLoading(false)
              alert(response.data)
              setshowDeconnect(false)
        })
    }

    LogInStore.subscribe(()=>{
        setloginState(LogInStore.getState().login)
    })
    const login  = ()=>{
              if(infoLogin.nom !== "" && infoLogin.mdp !== ""){
                setisLoading(true)
                axios.post(serverInfo+"/login",infoLogin,{withCredentials:true}).then(response=>{
                  setisLoading(false)
                  if(response.data.message !== "OK"){
                    alert(response.data)
                  }else{
                    LogInStore.dispatch({type:"MAJ",login:true});
                    setshowModalConnection(false)
                    setinfoLogin({})
                  }
                  setisValidLogin(true)
                })
              }else{
                setisValidLogin(false)
             }
    }
    const [isLoading, setisLoading] = useState(false)
    const inscription = ()=>{
        if(infoInscription.nom !== "" && infoInscription.mdp !== ""){
          setisLoading(true)
          axios.post(serverInfo+"/addUser",infoInscription).then(response=>{
            setisValidInscription(true)
            setmodalInscription(false)
            setinfoInscription({})
            setisLoading(false)
            alert("veuillez vous connecter")
          })
        }else{
          setisLoading(false)
          setisValidInscription(false)
        }
    }
    const [infoUser, setinfoUser] = useState({})
    const getInfouser = ()=>{ 
      axios.post(serverInfo+"/getInfoUser",{},{withCredentials:true}).then(response=>{
      setinfoUser(response.data)
      // console.log(response.data)
    })
    }
    useEffect(()=>{
       getInfouser()
    },[loginState])
    return (
        <div className="shadow">
           <Modal show={isLoading}>
             <div className="d-flex justify-content-center p-5">
                  <Spinner animation="grow" variant="warning" />
                  <Spinner animation="grow" variant="info" />
                  <Spinner animation="grow" variant="danger" />
                  <Spinner animation="grow" variant="dark" />
               </div>
          </Modal>
           <Modal show={modalInscription} onHide={()=>setmodalInscription(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>S'inscrire</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                          <Form.Control onChange={(e)=>handleInscription("nom",e.target.value)} type="text" placeholder="Entrer le nom d'utilisateur" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                          <Form.Control onChange={(e)=>handleInscription("mdp",e.target.value)} type="password" placeholder="Mot de passe" />
                      </Form.Group>
                    </Form>
                    {
                      !isValidInscription &&  <p className="text-danger">Veuillez remplir tous les champs!</p>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setmodalInscription(false)}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={inscription}>
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
                        <Form.Control onChange={(e)=>handleLogin("nom",e.target.value)} placeholder="Entrer le nom d'utilisateur" />
                        <Form.Text className="text-muted">
                        </Form.Text>
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control onChange={(e)=>handleLogin("mdp",e.target.value)} type="password" placeholder="Mot de passe" />
                      </Form.Group>
                    </Form>
                    {
                      !isValidLogin &&  <p className="text-danger">Veuillez remplir tous les champs!</p>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setshowModalConnection(false)}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={login}>
                        Se connecter
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

                    <Button variant="danger" onClick={disconnect}>
                        Se déconnecter
                    </Button>
                    </Modal.Footer>
            </Modal>
          <Container fluid>
            <Row>
              <Col className="navigation bg-dark shadow p-3 mb-5 bg-body">
                <div className="d-flex align-items-center">
                  
                  {
                      loginState && <div><Icon.PersonCircle color="#fff" size={25}/><span className="text-white ml-2">{infoUser.nom}</span></div> 
                  }
                </div>
                <div>
                {/* <Button variant="danger" onClick={()=>{
                  console.log(LogInStore.getState().login) 
                  // axios.post(serverInfo+"/cookietest",{},{withCredentials:true}).then(response=>{
                  //     console.log(response.data)
                  // })
                }}>
                      <Icon.GearFill className="mr-1" color="#fff"/>
                        cookie test
                  </Button> */}
                  
                  {
                      loginState && 
                      <Button variant="danger" onClick={()=>setshowDeconnect(true)}>
                          <Icon.GearFill className="mr-1" color="#fff"/>
                            Se déconnecter
                      </Button>
                    }
                   {
                      !loginState && 
                      <Button onClick={()=>setmodalInscription(true)} variant="success" className="ml-2">Inscription
                      </Button>
                      }
                  {
                      !loginState && 
                      <Button onClick={()=>setshowModalConnection(true)} variant="info" className="ml-2">Se connecter 
                      <Icon.BoxArrowInLeft className="ml-2"/>
                      </Button>
                      }
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default Nav
