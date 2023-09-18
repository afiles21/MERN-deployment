import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const EditStore = (props) => {

    const {id} = useParams();
    const [ name, setName ] = useState("");
    const [ number, setNumber ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);
    const navigate = useNavigate();
    const [ storeErrors, setStoreErrors ] = useState([]);

    useEffect( () => {
        axios.get('http://localhost:8000/api/stores/' + id)
            .then( res => {
                setName(res.data.name);
                setNumber(res.data.number);
                setIsOpen(res.data.isOpen);
            })
            .catch( err => console.log(err))
    }, [])

    const updateStoreHandler = e => {
        e.preventDefault();
        axios.patch('http://localhost:8000/api/stores/' + id, {
            name,
            number,
            isOpen
        })
            .then( res => {
                console.log(res);
                navigate('/stores/' + id);
            })
            .catch( err => {
                console.log(err);
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)) {
                    errArray.push(err.response.data.errors[key].message)
                }
                setStoreErrors(errArray);
            })
    }

    return(
        <div>
            <h1>Store Finder</h1>
            <Link to={'/'}>Home</Link>
            <p>Add a new store!</p>
            <form onSubmit={updateStoreHandler}>
                <div style={{ color: "red" }}>
                    {
                        storeErrors.map( (err, idx) => {
                            return(
                                <p key={idx}>{err}</p>
                            )
                        })
                    }
                </div>
                <div>
                    <label>Store Name</label>
                    <input type='text' value={name} onChange={ e => setName(e.target.value)}/>
                </div>
                <div>
                    <label>Store Number</label>
                    <input type='number' value={number} onChange={ e => setNumber(e.target.value)}/>
                </div>
                <div>
                    <label>Open?</label>
                    <input type='checkbox'  checked={isOpen} onChange={ e => setIsOpen(e.target.checked)}/>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default EditStore;