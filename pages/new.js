import LInk from 'next/link'
import { useState, useEffect, createContext } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const NewItem = () => {
    const [form, setForm] = useState({ title: '', description: ''})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createItem();
            } else {
                setIsSubmitting(false);
            }
            
        }
    }, [errors])

    const createItem = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/store', {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
                router.push("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required';
        }
        if (!form.description) {
            err.description = 'Description is required';
        }

        return err;
    }
    
    return (
        <section className="main-section input-page">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Create item</h1>
                        {
                            isSubmitting
                                ? <div className="spinner">
                                    <Spinner animation="border" />
                                </div>
                                : <Form className="create-item-form" onSubmit={handleSubmit}>

                                    <Form.Group controlId="formTitle">
                                        <Form.Label>Shop name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="title"
                                            placeholder="Shop name"
                                            onChange={handleChange} 
                                            isInvalid={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Shop description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            name="description"
                                            placeholder="Shop description"
                                            onChange={handleChange} 
                                            isInvalid={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
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

export default NewItem;