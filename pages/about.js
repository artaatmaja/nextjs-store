const { Container, Row, Col } = require("react-bootstrap")

const About = () => {
    return (
        <>
            <section className="main-section">
                <Container>
                    <Row>
                        <Col>
                            <h1>About</h1>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default About;
