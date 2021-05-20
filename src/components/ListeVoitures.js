import React, { useEffect, useState } from 'react'
import {Button, Row, Col, Container} from "react-bootstrap"
import "./Styles/ListVoitures.css"
import Voitures from "./Voitures"
import axios from 'axios'
import serverInfo from  './config/serverInfo'
import { LogInStore } from './store/store';
function ListeVoitures() {
    const [voitures, setvoitures] = useState([])
    useEffect(()=>{
        axios.post(serverInfo+'/getvoitures',{}).then(response=>{
            setvoitures(response.data)
        })
    },[])
    return (
        <Container fluid className="listeVoitures"> 
            {
                voitures.map((val,key)=>{
                    return(
                        <Voitures item={val} key={key}/>
                    )
                })
            }
        </Container>
    )
}

export default ListeVoitures
