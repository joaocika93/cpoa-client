import React, { useState } from 'react';
import Drawer from '../../components/Drawer'
import { Navbar, Container, Col, Card } from 'react-bootstrap'
import Button from '@material-ui/core/Button';
import api from '../../services/api'

export default function ProductPage({ match }) {
    const [productSelect, setProductSelect] = useState([])

    async function getProduct() {
        const response = await api.get(`/produtos/get/${match.params.idProduct}`)
        setProductSelect(response.data);
    }
    getProduct();

    function addCart(productSelect) {
        api.post('/cart/add', {
            name: productSelect.name,
            value: productSelect.value
        }).then(response => {
            console.log('Salvo com Sucesso')
        })
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
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={productSelect.imagem} />
                <Card.Body>
                    <Card.Title>{productSelect.nome}</Card.Title>
                    <Card.Text>{productSelect.preco}</Card.Text>
                    <Card.Text>{productSelect.descricao}</Card.Text>
                </Card.Body>
                <Button variant="outlined" color="primary" onClick={() => addCart(productSelect)}>Adcionar ao Carrinho</Button>
                <Button href='/carrinho' variant="contained" color="primary">Encomendar</Button>
            </Card>
        </>
    )
}