import React, { useState, useEffect } from 'react';
import Drawer from '../../components/Drawer'
import { Navbar, Container, Col } from 'react-bootstrap'
import api from '../../services/api'
import ProductCard from '../../components/ProductCard'

export default function ShoppingCart() {
    const [product, setProduct] = useState([])

    useEffect(() => {
        getList()
    }, [])

    async function getList() {
        const response = await api.get('/cart/get');
        setProduct(response.data)
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
            <Container fluid>
                <Col style={{ textAlign: 'center' }}>
                    {product.map(product => <div key={product.idProduct}> <ProductCard dados={product} /> </div>)}
                </Col>
            </Container>
        </>
    );
}
