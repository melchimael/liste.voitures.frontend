import React, { useState, useEffect } from 'react'
import {Button, Image, InputGroup, FormControl,Modal} from "react-bootstrap"
import * as Icon from 'react-bootstrap-icons';
import './Styles/Voitures.css'
import axios from 'axios'
import serverInfo from  './config/serverInfo'
import { LogInStore } from './store/store';
import io from "socket.io-client"

const Voitures = ({item})=>{
    const [loginState, setloginState] = useState(false)
    const [commentShow, setcommentShow] = useState(false)
    LogInStore.subscribe(()=>{
        setloginState(LogInStore.getState().login)
    })
    const [infoUser, setinfoUser] = useState({})
    const [commentaire, setcommentaire] = useState("")
    const getInfouser = ()=>{ 
        if(loginState){
            axios.post(serverInfo+"/getInfoUser",{},{withCredentials:true}).then(response=>{
            setinfoUser(response.data)
            // console.log(response.data)
            })
        }
    }
    const showcomments = ()=>{
        if(commentShow){
            setcommentShow(false)
        }else{
            if(loginState){
                setcommentShow(true)
                getComment()
            }else{
                setshowConnect(true)
            }
        }
        
        // console.log(loginState)
    }
    const comment = ()=>{
        socket.emit("comment",{
            userId:infoUser._id,
            commentaire:commentaire,
            id:item._id,
            nom:infoUser.nom,
            date:new Date()
        })
        setcommentaire('')
        if(loginState){
            setcommentShow(true)
            // getComment()
        }else{
            setshowConnect(true)
        }
       
    }
    const [comments, setcomments] = useState([])
    const getComment = ()=>{
        if(loginState==true){
            // console.log(item._id)
            axios.post(serverInfo+'/getComments',{voitureId:item._id}).then(response=>{
                setcomments(response.data)
                // console.log(response.data)
            })
        }
    }
    useEffect(()=>{
        setloginState(LogInStore.getState().login)
       getInfouser();
    },[loginState])
    const [showConnect, setshowConnect] = useState(false)
    const [socket, setsocket] = useState("")
    useEffect(() => {
        setsocket(io.connect(serverInfo)) 
    },[])
    useEffect(()=>{
        if(socket !== ""){ 
            socket.on("comment"+item._id,data => {
                getComment()
            })
        }
    })
    return (
        <div className="rounded bg-muted shadow m-2 voiture">
                <Modal show={showConnect} onHide={()=>setshowConnect(false)}>
                    {/* <Modal.Header closeButton>
                        <Modal.Title>Veuillez vous indentifier</Modal.Title>
                    </Modal.Header> */}
                    <Modal.Body>Veuillez vous connecter pour voir les commentaires</Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={()=>setshowConnect(false)}>
                        OK
                    </Button>

                    </Modal.Footer>
                </Modal>
            <div className="d-flex flex-direction-row">
                <Image src={item.photo} className="img-fluid photoVoiture shadow"/>
                <div className="m-2">
                    <h5 className="modele">{item.model}</h5>
                    <p>Année : {item.annee} </p>
                    <p>Marque : {item.marque}</p>
                    <p>Couleur : {item.couleur} </p>
                </div>
            </div>
            <a onClick={showcomments} className="m-2 comment-shower"><Icon.ChatLeftDotsFill color="#333" size={20}/>
                <span className="ml-2 fw-bolder">Commentaires</span>
                <Icon.ChevronDown className="ml-2"/> 
            </a>  
            {/* <Button variant="primary" onClick={testSocket}>TEST SOCKET</Button> */}
        {
            commentShow &&   <div>
            {
                comments.map((val,key)=>{
                    return(
                        <div className="m-2 shadow p-1 rounded border" key={key}> 
                            <div className="d-flex flex-direction-row align-items-center justify-content-between">
                                <div className="d-flex flex-direction-row align-items-center"><h6>{val.nomUser}</h6><Icon.Person className="ml-1 mb-2" size={20}/></div>  
                                <p className="m-0 text-muted">{val.date.substring(0,10)}</p>
                            </div>
                            <p className="text-justify">{val.commentaire}</p>
                        </div>
                    )
                })
            }        
            
        </div>
        } 
      
        {
            loginState && 
            <InputGroup className="mb-0">
                <FormControl
                    value={commentaire}
                    onChange={(e)=>setcommentaire(e.target.value)}
                        placeholder="Votre commentaire ici"
                />
                <InputGroup.Append>
                <Button onClick={comment} variant="outline-primary">Commenter</Button>
                </InputGroup.Append>
            </InputGroup>
        }

        </div>
    )
}

export default Voitures
