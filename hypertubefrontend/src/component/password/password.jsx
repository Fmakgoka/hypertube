import React, { useState } from 'react';
import './password.css';
import {Input } from 'reactstrap'
import { useHistory } from 'react-router-dom';
//import { BrowserRouter as Router, Link } from 'react-router-dom';

//import Intra42 from 'intra42';


function Resetpassword(props) {

    const [user, setUser] = useState({
        password: "",
        confirm: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:9000/resetpassword', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-Type': 'application/json' }
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/password')
                else if (res.status === 200)
                    history.push('/login')

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
       
        <section id="cover" className="min-vh-100">
            <div id="cover-caption">
                <div className="container">
                    <div className="row text-white">
                        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4">
                            <h1 className="display-4 py-2 text-truncate">Hypertube</h1>
                            <p>you can change password</p>
                            <div className="px-2">
                                <form onSubmit={submit} className="justify-content-center">
                                    <div className="form-group">
                                        <label className="sr-only">Password</label>
                                        <Input type="password" name="password" value={user.password}
                                            onChange={handleChange} placeholder="Password" />
                                    </div>
                                    <div className="form-group">
                                        <label className="sr-only">Password</label>
                                        <Input type="password" name="confirm" value={user.confirm}
                                            onChange={handleChange} placeholder="confirm" />

                                    </div>
                                    <button type="submit" className="btn btn-light">Reset</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Resetpassword;