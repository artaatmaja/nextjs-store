import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'

import React from 'react'

const Contact = () => {
    return (
        <>
            <div className="contact-page">
                <section className="main-section">
                    <Container>
                        <Row>
                            <Col md={6} className="d-flex justify-content-center align-items-start flex-column">
                                <h1>Contact</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, asperiores consequatur sequi unde quod in ducimus nobis cupiditate accusamus ratione. Ducimus corrupti esse amet dignissimos quos magni autem ipsam eius?</p>
                                <Link href="#">
                                    <a className="contact-link">221B Baker Street</a>
                                </Link>
                                <Link href="tel:+6282236919432">
                                    <a className="contact-link">+6282236919432</a>
                                </Link>
                                <Link href="mailto:arta.atmaja@gmail.com">
                                    <a className="contact-link">arta.atmaja@gmail.com</a>
                                </Link>
                            </Col>
                            <Col md={6}>
                                <img src="/images/shop.jpg" alt="Contact"/>
                            </Col>
                        </Row>
                    </Container>        
                </section>
            </div>
        </>
    )
}

export default Contact

