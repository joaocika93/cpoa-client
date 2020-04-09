import React, { useEffect } from 'react'
import ProductList from '../../components/ProductList'
import api from '../../services/api'

export default function HomePage({history}) {
    
    useEffect(() => {
        load()
        //eslint-disable-next-line
    }, [])

    function load() {
        api.get(`/clientes/buscar/${localStorage.getItem('googleId')}`).then(response => {
            // if (response.data === '') {
            //     history.push('/')
            // }else if(localStorage.getItem('logged') !== 'true'){
            //     history.push('/')
            // }
            console.log(response.data)
        })
        
    }

    return (
        <div>
            <ProductList>
            </ProductList>
        </div>
    )
}
