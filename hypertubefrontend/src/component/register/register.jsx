import React, { useState } from 'react';
import './register.css';
import {Input} from 'reactstrap'
import {useHistory} from 'react-router-dom';


function Register(props) {
    const [state, setState] = useState({
        username: "",
        firstname: "",
        lastname:"",
        email: "",
        password: "",
        confirm: ""
    })
    
    const history = useHistory();
    const submit = e =>{
        e.preventDefault()
        console.log(state)
        fetch('http://localhost:9000/register', {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {'Content-Type': 'application/json'},
        })
          .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/register')
                else if (res.status === 200)
                    history.push('/login')

            })
         .catch(error => console.log(error))

    }  
    const handleChange = (e) =>{
        e.persist();
        debugger
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }
    return (
        <section id="cover" className="min-vh-100">
        <div id="cover-caption">
            <div className="container">
                <div className="row text-white">
                    <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                        <h1 className="display-4 py-2 text-truncate">Hypertube</h1>
                        <div className="px-2">
                            <form onSubmit={submit} className="justify-content-center">
                            <div className="form-group">
                                    <label className="sr-only">UserName</label>
                                    <Input  type="text" name="username" value={state.username} 
                                    onChange= {handleChange} placeholder= "UserName"/>
                                </div>
                            <div className="form-group">
                                    <label className="sr-only">FirstName</label>
                                    <Input type="text" name="firstname" value={state.firstname}
                                    onChange={handleChange} placeholder= "FirstName"/>
                                </div>
                            <div className="form-group">
                                    <label className="sr-only">LastName</label>
                                    <Input type="text" name="lastname" value={state.lastname} 
                                         onChange={handleChange} placeholder= "LastName"/>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Email</label>
                                    <Input type="text" name="email" value={state.email}
                                        onChange={handleChange} placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Password</label>
                                    <Input type="password" name="password" value={state.password} 
                                   onChange={handleChange} placeholder= "Password"/>
                                </div>
                                <div className="form-group">
                                    <label className="sr-only">Confirm</label>
                                    <Input type="password" name="confirm" value={state.confirm} 
                                     onChange={handleChange} placeholder= "Confirm"/>
                                </div>
                                <button type="submit" className="btn btn-light">sign_up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    );    
}

export default Register;