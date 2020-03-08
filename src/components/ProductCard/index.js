import React from 'react';

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Card } from 'react-bootstrap'
import api from '../../services/api'

export default function ProductCard(product) {
    function addCart(product) {
        api.post('/cart/add', {
            name: product.name,
            value: product.value,
            description: product.description,
            img: product.img,
            favorite: product.favorite
        }).then(response => {
            console.log('Salvo com Sucess')
        })
    }
    return (
        <div>
            <Card >
                <Link href={`produto/${product.dados.idProduct}`}>
                    <Card.Img variant="top" src={product.dados.img} />
                    <Card.Body>
                        <Card.Title>{product.dados.name}</Card.Title>
                        <Card.Text>{product.dados.value}</Card.Text>
                        <Card.Text>{product.dados.description}</Card.Text>
                    </Card.Body>
                </Link>
                <Button variant="outlined" color="primary" onClick={() => addCart(product.dados)}>Adcionar ao Carrinho</Button>
                <Button href='/carrinho' variant="contained" color="primary">Encomendar</Button>
            </Card>
            <br></br>
        </div>
    );
}
