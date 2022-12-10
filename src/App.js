import Reg from './pages/Register'
import Login from './pages/Login'
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Admin from './pages/PageAdmin'
import Edit from './pages/Edit'
import Dasboard from './pages/Dasboard'
import Cart from './pages/Cart'

function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <main>
          <Switch>
            <Route path="/reg" component={Reg} exact/>
            <Route path="/login" component={Login} exact/>
            <Route path="/data" component={Admin} exact/>
            <Route path="/edit/:id" component={Edit} exact/>
            <Route path="/" component={Dasboard} exact/>
            <Route path="/cart" component={Cart} exact/>
          </Switch>
        </main>
        </BrowserRouter>
    </div>
  );
}

export default App;
