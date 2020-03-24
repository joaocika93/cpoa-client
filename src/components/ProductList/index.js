import React, { useState, useEffect } from 'react'
import { Navbar, Container, Col } from 'react-bootstrap'
import Drawer from '../Drawer';
import InfiniteScroll from 'react-infinite-scroll-component';

import api from '../../services/api'
import ProductCard from '../ProductCard'
import Loading from '../../components/giphy.gif'
import TextField from '@material-ui/core/TextField';

export default function ProductList() {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState([]);
    const [productPage] = useState(4);

    useEffect(() => {
        getList()
        getAllProduct()
        //eslint-disable-next-line
    }, [])

    function getAllProduct() {
        api.get('/produtos/getAll').then(response => {
            setTotalProduct(response.data);
        })
    }

    function getList() {
        setTimeout(() => {
            api.get(`/produtos/get?page=${page}&size=${productPage}`).then(response => {
                setProduct([...product, ...response.data.content]);
                setPage(page + 1)
            })
        }, 2000);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
            window.location.href = `buscaProduto/${e.target.value}`

        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Col>
                        <Drawer></Drawer>
                    </Col>
                    <Col>
                        <TextField id="standard-search" type="search" label="Search" onKeyDown={handleKeyDown} />
                    </Col>
                </Container>
            </Navbar>
            <Container fluid>
                <Col style={{ textAlign: 'center' }}>
                    <InfiniteScroll
                        dataLength={product.length}
                        next={getList}
                        hasMore={product.length === totalProduct.length ? false : true}
                        loader={<img src={Loading} width={80} alt="Loading"></img>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {product.map(dados => <div key={dados.id}> <ProductCard dados={dados} /></div>)}
                    </InfiniteScroll>
                </Col>
                <br />
            </Container>
        </div>
    )

}



