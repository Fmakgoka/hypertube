import React, { useState } from 'react';
import './profile.css';
import { Input } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import Header from '../header';
//import { BrowserRouter as Router, Link } f
function Editprofile() {

    const [user, setUser] = useState({
        password: "",
        confirm: ""
    })

    const history = useHistory();
    const submit = e => {
        e.preventDefault()

        fetch('http://localhost:9000/password', {
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
        <div class="container rounded bg-white mt-5 mb-5">
            <Header/>
            <div class="row">
                <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar img-circle img-thumbnail" alt="avatar"/>
               <h6>Upload a different photo...</h6>
               <input type="file" class="text-center center-block file-upload"/>                                                           
            </div>
            </div>
           <div class="col-md-5 border-right">
             <form onSubmit={submit} >
                 <div class="p-3 py-5">
                     <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                     </div>
                     <div class="row mt-2">
                       <div class="col-md-6">
                            <label class="labels">firstname</label>                                    <Input type="text" name="firstname" value={user.firstname}
                            onChange={handleChange} placeholder="firstName" />
                       </div>
                           <div class="col-md-6">
                           <label class="labels">Lastname</label>
                           <Input type="text" name="lastname" value={user.lastname}
                            onChange={handleChange} placeholder="LastName" />
                        </div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12">
                          <label class="labels">UserName</label>
                          <Input type="text" name="username" value={user.username}
                          onChange={handleChange} placeholder="username" />
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Email</label>
                            <Input type="text" name="email" value={user.email}
                            onChange={handleChange} placeholder="email" />                        
                        </div>
                        <div class="col-md-12">
                            <label class="labels">Oldpassword</label>
                            <Input type="password" name="password" value={user.password}
                            onChange={handleChange} placeholder="Oldpassword" />
                        </div>
                     </div>
                     <div class="mt-5 text-center">
                        <button class="btn btn-primary profile-button" type="submit">update Profile</button>
                     </div>
                 </div>
                </form>
             </div>
         </div>
     </div>
    )

}

export default Editprofile;