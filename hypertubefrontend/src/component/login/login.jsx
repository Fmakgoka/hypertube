import React, { useState } from 'react';
import './login.css';
import {Input } from 'reactstrap'
import { useHistory } from 'react-router-dom';
//import { BrowserRouter as Router, Link } from 'react-router-dom';

//import Intra42 from 'intra42';


function Login(props) {

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:9000/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-Type': 'application/json' }
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/login')
                else if (res.status === 200)
                    history.push('/homepage')

            })
            .catch(error => console.log(error))


    }

    const handleChange = (e) => {
        e.persist();
        // debugger
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    return (
       
        <section id="cover" class="min-vh-100">
            <div id="cover-caption">
                <div class="container">
                    <div class="row text-white">
                        <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                            <h1 class="display-4 py-2 text-truncate">Hypertube</h1>
                            <div class="px-2">
                                <form onSubmit={submit} class="justify-content-center">
                                    <div class="form-group">
                                        <label class="sr-only">UserName</label>
                                        <Input type="text" name="username" value={user.username}
                                            onChange={handleChange} placeholder="UserName" />
                                    </div>
                                    <div class="form-group">
                                        <label class="sr-only">Password</label>
                                        <Input type="password" name="password" value={user.password}
                                            onChange={handleChange} placeholder="Password" />

                                    </div>
                                    <button type="submit" class="btn btn-light">Sign_in</button>{' '}{' '}
                                    <a href='http://localhost:3000/forgotpassword'>Forgot Password?</a>
                                    <div className="form-group">
                                        <p>OR SIGN-IN WITH:
                                        <a href='http://localhost:9000/auth/github'>
                                            <i class="fa fa-github" aria-hidden="true" ></i>
                                        </a>
                                        <a href='http://localhost:9000/auth/intra'>
                                            <i class="fa fa-slack" aria-hidden="true"></i>
                                        </a></p>
                                    </div>
                                    <div className="form-group">
                                        <p>DO YOU HAVE ACC?
                                        <button type="button" class="btn btn-light"><a href='http://localhost:3000/register'>sign_up</a></button>
                                        </p>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Login;