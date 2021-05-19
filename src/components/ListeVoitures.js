import React from 'react'
import {Button, Row, Col, Container} from "react-bootstrap"
import "./Styles/ListVoitures.css"
import Voitures from "./Voitures"
function ListeVoitures() {
    return (
        <Container fluid className="listeVoitures"> 
                <Voitures/>
                <Voitures/>
                <Voitures/>
        </Container>
    )
}

export default ListeVoitures
