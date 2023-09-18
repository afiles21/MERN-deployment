import React, {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const ViewStore = (props) => {

    const {id} = useParams();
    const [oneStore, setOneStore] = useState({});


    useEffect(() => {
        axios.get('http://localhost:8000/api/stores/' + id)
            .then( res => setOneStore(res.data))
            .catch( err => console.log(err))
    }, [id])

    return(
        <div>
            <h1>Store Finder</h1>
            <Link to={'/'}>Home</Link>
            <h5>Store Name: {oneStore.name}</h5>
            <h5>Store Number: {oneStore.number}</h5>
            <h5>Store Status: {oneStore.isOpen ? "Open" : "Closed"}</h5>
            <Link to={'/stores/edit/' + oneStore._id}><button>Edit Store Details</button></Link>
        </div>
    );
}

export default ViewStore;