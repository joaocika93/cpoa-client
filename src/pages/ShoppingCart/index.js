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
        const response = await api.get('/pedidos/get');
        setProduct(response.data)
    }

    console.log(product.itens)


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
                    {product.map(product =>
                        <div key={product.id}> {product.itens.map(itens =>
                            <div key={itens.id}> <ProductCard dados={itens.produto} /></div>)}
                        </div>)}
                </Col>
            </Container>
        </>
    );
}
