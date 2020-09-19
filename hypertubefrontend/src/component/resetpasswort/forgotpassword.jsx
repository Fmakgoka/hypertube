import React, { useState } from 'react';
import './forgotpassword.css';
import { Input } from 'reactstrap'
import { useHistory } from 'react-router-dom';


function Forgotpassword() {
    const [user, setUser] = useState({
        email: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:9000/forgotpassword', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'content-Type': 'application/json' }
        })
            .then(res => {
                console.log(`req successful ${res.status}`);
                if (res.status === 401)
                    history.push('/forgotpassword')
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
                            <p>Please enter youremail address</p>
                            <div className="px-2">
                                <form onSubmit={submit} className="justify-content-center">
                                    <div className="form-group">
                                        <label className="sr-only">Email</label>
                                        <Input type="text" name="email" value={user.email}
                                            onChange={handleChange} placeholder="email" />
                                    </div>
                                    <button type="submit" className="btn btn-light">forgotpassword</button>
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

    )
}

export default Forgotpassword;