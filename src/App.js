import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Inscription from './components/Inscription';
import ListeVoitures from './components/ListeVoitures';
import Nav from './components/Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {LogInStore} from'./components/store/store';
import serverInfo from './components/config/serverInfo';
function App() {
  const [isOnline, setisOnline] = useState(false)
  // const [user, setuser] = useState("")
  LogInStore.subscribe(()=>{
    setisOnline(LogInStore.getState().login)
  })  
  useEffect(()=>{
      axios.post(serverInfo+"/checkIfOnline",{},{withCredentials:true}).then(response=>{
            if(response.data){
                setisOnline(true)
                LogInStore.dispatch({type:"MAJ",login:true});
            }else{
                LogInStore.dispatch({type:"MAJ",login:false});
              setisOnline(false)
            }
            console.log(response.data)
      })
  },[isOnline])
  return (
    <BrowserRouter>
        <div className="containerView">
          <Nav/>
          <Switch className="bg-dark">
              <Route exact path="/" component={ListeVoitures}></Route>
              <Route path="/inscription" component={Inscription}></Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
