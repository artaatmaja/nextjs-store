import LInk from 'next/link'
import { useState, useEffect, createContext } from 'react'
import fetch from 'isomorphic-unfetch'
import { Button, Form, Spinner, Container, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

const EditItem = ({ store }) => {
    // console.log(store)
    const [form, setForm] = useState({ title: store.title, description: store.description, items: store.items})
    const [itemsState, setFormItem] = useState({ name: '', price: '', amount: ''})
    // console.log(form)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateItem();
            } else {
                setIsSubmitting(false);
            }
            
        }
    }, [errors])

    const updateItem = async () => {
        form.items.push(itemsState)
        // console.log(form)
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

    const handleChangeItem = (e) => {
        setFormItem({
            ...itemsState,
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
        // console.log(form);

        return err;
    }
    
    return (
        <section className="main-section input-page">
            <Container>
                <Row>
                    <Col>
                        <h1 className="text-center">Add item</h1>
                        {
                            isSubmitting
                                ? <div className="spinner">
                                    <Spinner animation="border" />
                                </div>
                                : <Form className="create-item-form" onSubmit={handleSubmit}>

                                    <Form.Group controlId="formTitle" className="d-none">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="title"
                                            value={form.title}
                                            onChange={handleChange} 
                                            isInvalid={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formDescription" className="d-none">
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
                                    
                                    <Form.Group controlId="formItemName">
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="name"
                                            placeholder="Product name"
                                            onChange={handleChangeItem} 
                                            isInvalid={errors.title ? { content: 'Please enter a title', pointing: 'below' } : null}
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group controlId="formItemPrice">
                                        <Form.Label>Item Price</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            name="price"
                                            placeholder="Product price"
                                            onChange={handleChangeItem} 
                                            isInvalid={errors.title ? { content: 'Please enter a price', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formItemAmount">
                                        <Form.Label>Item Amount</Form.Label>
                                        <Form.Control 
                                            type="number"
                                            name="amount"
                                            placeholder="Product amount"
                                            onChange={handleChangeItem} 
                                            isInvalid={errors.title ? { content: 'Please enter amount', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formItemAmount">
                                        <Form.Label>Item Amount</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3}
                                            name="description"
                                            placeholder="Product description"
                                            onChange={handleChangeItem} 
                                            isInvalid={errors.title ? { content: 'Please enter amount', pointing: 'below' } : null}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="m-r-15">
                                        Add item
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