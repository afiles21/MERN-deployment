import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const StoreForm = ({allStores, setAllStores}) => {

    const [ name, setName ] = useState("");
    const [ number, setNumber ] = useState("");
    const [ isOpen, setIsOpen ] = useState(false);
    const [ storeErrors, setStoreErrors ] = useState([]);
    const navigate = useNavigate();

    const createStoreHandler = e => {
        e.preventDefault();
        const newStore = {
            name,
            number,
            isOpen
        };

        console.log(newStore);
        axios.post('http://localhost:8000/api/stores', newStore)
            .then( res => {
                setAllStores([...allStores, res.data]);
                setName("");
                setNumber("");
                setIsOpen(false);
                navigate('/stores/' + res.data._id)
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
            <form onSubmit={createStoreHandler}>
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

export default StoreForm;