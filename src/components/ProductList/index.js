import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import SearchResults from 'react-filter-search'
import { Navbar, FormControl, Card, Container, Col } from 'react-bootstrap'
import Drawer from '../Drawer';


export default function ProductList() {
    const productsList = useSelector(state => state.data[0])
    const dispatch = useDispatch();
    const [productByName, setProductByName] = useState([])

    async function getList() {
        const response = await axios.get('https://colonial-product-ordering.herokuapp.com/product/all-product');
        const INITIAL_STATE = response.data
        dispatch({ type: 'LOAD_CONTENT', load: INITIAL_STATE })
    }
    getList()


    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Col>
                        <Drawer></Drawer>
                    </Col>
                    <Col>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" value={productByName} onChange={e => setProductByName(e.target.value)} />
                    </Col>
                </Container>
            </Navbar>
            <br />
            <SearchResults
                value={productByName}
                data={productsList}
                renderResults={results => (
                    <div>
                        <ul>
                            {results.map(product => (
                                <div>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>
                                            <Card.Text>{product.value}</Card.Text>
                                            <Card.Text>{product.description}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                    <br></br>
                                </div>
                            ))}
                        </ul>
                    </div>
                )}
            />
        </div>
    )
}
