import React, { useState, useEffect } from 'react'
import { Navbar, Container, Col } from 'react-bootstrap'
import Drawer from '../../components/Drawer';
import SearchResults from 'react-filter-search'
import ProductCard from '../../components/ProductCard';
import api from '../../services/api'

export default function SearchPage({ match }) {
    const [searchProduct, setSearchProduct] = useState([]);

    useEffect(() => {
        getAllProduct()
    }, [match.params.busca])

    async function getAllProduct() {
        try {
            const response = await api.get('/product/getAll')
            setSearchProduct(response.data)
        } catch (e) {
            console.log("erro")
        }
    }


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Col>
                        <Drawer></Drawer>
                    </Col>
                </Container>
            </Navbar>
            <SearchResults
                value={match.params.busca}
                data={searchProduct}
                renderResults={results => (
                    <>
                        {results.map(product => <div key={product.idProduct}> <ProductCard dados={product} /> </div>)}
                    </>

                )}
            />
        </>
    );
}
