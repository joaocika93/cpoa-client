import React from 'react';

import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { Card } from 'react-bootstrap'
import api from '../../services/api'

export default function ProductCard(product) {
    function addCart(product) {
        api.post('/itempedido/add', {
            desconto: 0,
            quantidade: 1,
            preco: product.preco,
            produto: {
                id:product.id
            }
        }).then(response => {
            console.log('Salvo com Sucess')
        })
    }
    return (
        <div>
            <Card >
                <Link href={`produto/${product.dados.id}`}>
                    <Card.Img variant="top" src={product.dados.imagem} />
                    <Card.Body>
                        <Card.Title>{product.dados.nome}</Card.Title>
                        <Card.Text>{product.dados.preco}</Card.Text>
                        <Card.Text>{product.dados.descricao}</Card.Text>
                    </Card.Body>
                </Link>
                <Button variant="outlined" color="primary" onClick={() => addCart(product.dados)}>Adcionar ao Carrinho</Button>
                <Button href='/carrinho' variant="contained" color="primary">Encomendar</Button>
            </Card>
            <br></br>
        </div>
    );
}
