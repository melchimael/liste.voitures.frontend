import React, { useState } from 'react'
import {Button, Image, InputGroup, FormControl,Modal} from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons';
import './Styles/Voitures.css'

function Voitures() {
    const [showConnect, setshowConnect] = useState(false)
    return (
        <div className="rounded bg-muted shadow m-2 voiture">
                <Modal show={showConnect} onHide={()=>setshowConnect(false)}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title>Veuillez vous indentifier</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>Veuillez vous connecter pour voir les commentaires</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setshowConnect(false)}>
                        Annuler
                    </Button>

                    <Button variant="primary" onClick={()=>{}}>
                        Se connecter
                    </Button>
                    </Modal.Footer>
                </Modal>
            <div className="d-flex flex-direction-row">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Nissan_Skyline_R34_GT-R_N%C3%BCr_002.jpg" className="img-fluid photoVoiture shadow"/>
                <div className="m-2">
                    <h5 className="modele">Skyline GTR 3</h5>
                    <p>Année : 2008</p>
                    <p>Marque : Nissan</p>
                    <p>Couleur : Gris</p>
                </div>
            </div>
            <a onClick={()=>setshowConnect(true)} className="m-2 comment-shower"><Icon.ChatLeftDotsFill color="#333" size={20}/>
                <span className="ml-2 fw-bolder">Voir les commentaires</span>
                <Icon.ChevronDown className="ml-2"/> 
            </a>   
            <div className="m-2 shadow p-1 rounded"> 
                <div className="d-flex flex-direction-row align-items-center justify-content-between">
                    <div className="d-flex flex-direction-row align-items-center"><h6>John Doe</h6><Icon.Person className="ml-1 mb-2" size={20}/></div>  
                    <p className="m-0 text-muted">2021-6-3</p>
                </div>
                <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <div className="m-2 shadow p-1 rounded"> 
                <div className="d-flex flex-direction-row align-items-center justify-content-between">
                    <div className="d-flex flex-direction-row align-items-center"><h6>John Doe</h6><Icon.Person className="ml-1 mb-2" size={20}/></div>  
                    <p className="m-0 text-muted">2021-6-3</p>
                </div>
                <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            </div>
            <InputGroup className="mb-0">
                <FormControl
                        placeholder="Votre commentaire ici"
                />
                <InputGroup.Append>
                <Button variant="outline-primary">Commenter</Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    )
}

export default Voitures
