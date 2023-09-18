import React, { useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = ({allStores, setAllStores}) => {

    useEffect( () => {
        axios.get('http://localhost:8000/api/stores')
            .then( res => setAllStores(res.data))
            .catch( err => console.log(err))
    }, [])

    const deleteHandler = e => {
        e.preventDefault();
        const id = e.target.id;
        axios.delete('http://localhost:8000/api/stores/' + id)
            .then( res => {
                const filteredStores = allStores.filter( store => store._id !== id);
                setAllStores(filteredStores);
            })
    }
    return(
        <div>
            <h1>Store Finder</h1>
            <p>Find stores in your area!</p>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Store</th>
                        <th>Store Number</th>
                        <th>Open</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStores.map( store => {
                            return(
                                <tr key={store._id}>
                                    <td><Link to={'/stores/' + store._id}>{store.name}</Link></td>
                                    <td>{store.number}</td>
                                    <td>{store.isOpen ? "True" : "False"}</td>
                                    <td>{store.isOpen ? <button onClick={deleteHandler} id={store._id}>Remove</button> : ""}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to={'/stores/add'}><button>Can't find your store?</button></Link>
        </div>
    );
}

export default Home;