import React, { useEffect } from 'react'
import ProductList from '../../components/ProductList'
import {useDispatch } from 'react-redux'
import api from '../../services/api'

export default function HomePage({ match }) {
    const dispatch = useDispatch()

    useEffect(() => {
        load()
        //eslint-disable-next-line
    }, [])

    async function load() {
        const response = await api.get(`/clientes/${match.params.id}`)
        dispatch({type: 'LOAD_USER', user: response.data})
    }

    return (
        <div>
            <ProductList>
            </ProductList>
        </div>
    )
}
