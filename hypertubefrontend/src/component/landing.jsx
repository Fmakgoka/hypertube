import React from 'react';
import Navbar  from './Navbar';

function Landing(){
    return(
        <div>
            <Navbar/>
            <div className="jumbotron mt-5">
                <div className="col-sm-8 mx-auto">
                    <h1 className="text-center">Hyper</h1>
                </div>
            </div>
        </div>
    )
}

export default Landing;