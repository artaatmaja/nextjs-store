import Link from 'next/link'
const { Container, Row, Col } = require("react-bootstrap")

const About = () => {
    return (
        <>
            <section className="main-section">
                <Container>
                    <Row>
                        <Col md={6} className="d-flex justify-content-center align-items-start flex-column">
                            <h1>About</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, asperiores consequatur sequi unde quod in ducimus nobis cupiditate accusamus ratione. Ducimus corrupti esse amet dignissimos quos magni autem ipsam eius?</p>
                            <Link href="/contact">
                                <a className="contact-link">Contact</a>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <img src="../images/shop.jpg" alt="About"/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default About;
