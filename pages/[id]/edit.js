import LInk from 'next/link'
import { useState, useEffect, createContext } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const EditItem = ({ store }) => {
    const [form, setForm] = useState({ title: store.title, description: store.description })
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateShop();
            } else {
                setIsSubmitting(false);
            }
            
        }
    }, [errors])

    const updateShop = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/store/${router.query.id}`, 
            {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            })
                router.push(`/${router.query.id}`);
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
                        <h1 className="text-center">Edit Shop</h1>
                        {
                            isSubmitting
                                ? <div className="spinner">
                                    <Spinner animation="border" />
                                </div>
                                : <Form className="create-item-form" onSubmit={handleSubmit}>

                                    <Form.Group controlId="formTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange} 
                                            isInvalid={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            name="description"
                                            value={form.description}
                                            onChange={handleChange} 
                                            isInvalid={errors.description ? { content: 'Please enter a description', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    {/* <Form.Group controlId="formItemAmount">
                                        <Form.Label>Item description</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            name="description"
                                            placeholder="Product description"
                                            onChange={handleChangeItem} 
                                            isInvalid={errors.title ? { content: 'Please enter amount', pointing: 'below' } : null}
                                        />
                                    </Form.Group> */}

                                    <Button variant="primary" type="submit" className="m-r-15">
                                        Edit Shop
                                    </Button>

                                    <Button variant="danger" onClick={() => router.back()}>
                                        Cancel
                                    </Button>

                                </Form>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

EditItem.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/store/${id}`);
    const { data } = await res.json();

    return { store: data }
}

export default EditItem;