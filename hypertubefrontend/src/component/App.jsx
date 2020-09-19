import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './login/login';
import Home from './homepage';
import Navbar  from './Navbar';
import Landing from './landing';
import Forgotpassword from './resetpasswort/forgotpassword';
import Register from './register/register';
import Resetpassword from './password/password';
import Editprofile from './profile/profile';
//import Intra42 from './intra42';

function App() {
    return(
        <Router>
            <div className="App">
                <Navbar/>
                <Route exact path="/" component={Landing}/>
                <Switch>
                    <Route path='/login'component = {Login}/>
                    <Route path='/forgotpassword'component = {Forgotpassword}/>
                    <Route path='/password' component= {Resetpassword}/>
                    <Route path='/register' component= {Register}/>
                    <Route path='/homepage' component= {Home}/>
                    <Route path='/profile' component= {Editprofile}/>
                </Switch>
            </div>

        </Router>
    )

}

export default App