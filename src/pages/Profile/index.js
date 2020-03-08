import React from 'react';
import Drawer from '../../components/Drawer'
import { Navbar, FormControl, Container, Col } from 'react-bootstrap'

export default function Profile() {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Col>
                        <Drawer></Drawer>
                    </Col>
                    <Col>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    </Col>
                </Container>
            </Navbar>
        </>
    );
}