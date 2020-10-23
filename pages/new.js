import LInk from 'next/link'
import { useState, useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const NewStore = () => {
    const [form, setForm] = useState({ title: '', description: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = () => {};
    const handleChange = () => {};
    
    return (
        <section className="main-section">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Create item</h1>
                        {
                            isSubmitting
                                ? <Spinner animation="border" />
                                : <Form className="create-item-form" onSubmit={handleSubmit}>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="title"
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            name="description"
                                            onChange={handleChange} 
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>

                                </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default NewStore;