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
function App() {
  return (
    <BrowserRouter>
        <div className="containerView">
          <Nav/>
          <Switch>
              <Route exact path="/" component={ListeVoitures}></Route>
              <Route path="/inscription" component={Inscription}></Route>
          </Switch>
        </div>
    </BrowserRouter>
  );
}

export default App;
