import React, { useEffect }  from 'react';
import Header from './header';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'



function Home() {
    const history = useHistory();
    useEffect(() => {
        axios.get('http://localhost:9000/homepage')
        .then(res => {
            setState(res.data)
            history.push('/homepage')
        })
    },[])

    const [state, setState] = useState('')
        return (
            <div>
                <Header />
            </div>
        )
    }

export default Home;