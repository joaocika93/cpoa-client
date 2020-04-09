import React from 'react';

import api from '../../services/api'
import { Button, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function ProductCard(product) {
    function addCart(product) {
        api.post('/itempedido/add', {
            desconto: 0,
            quantidade: 1,
            preco: product.preco,
            produto: {
                id: product.id
            }
        }).then(response => {
            console.log('Salvo com Sucess')
        })
    }
    return (
        <div >
            <br></br>
            <Card style={{ background: "#fafafa"}}>
                <CardActionArea>
                    <CardMedia style={{ height: "10em", width: "10em" }}
                        component="img"
                        image={product.dados.imagem}
                    />
                    <CardContent>
                        <Typography color="primary" gutterBottom variant="h5" component="h2">
                            {product.dados.nome}
                        </Typography>
                        <Typography color="secondary" gutterBottom variant="body1" component="h1">
                            R$ {product.dados.preco}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" variant="contained" color="primary" onClick={() => addCart(product.dados)}>Adicionar ao Carrinho</Button>
                    <Button size="small" href='/carrinho' variant="contained" color="secondary">Encomendar</Button>
                </CardActions>
                <ExpansionPanel style={{ background: "#fafafa" }} >
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography color="primary" gutterBottom variant="body2" component="p">
                            Descrição do Produto
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography style={{width:"20em", textAlign:"left"}} color="primary" gutterBottom variant="body2" component="p">
                            {product.dados.descricao}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Card>
            <br></br>
        </div>
    );
}
