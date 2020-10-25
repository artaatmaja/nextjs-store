import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Spinner, Container, Row, Col, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'

const Store = ({ stores }) => {
	const [confirm, setConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (isDeleting) {
			deleteItem();
		}
	}, [isDeleting])

	const deleteItem = async () => {
		const itemId = router.query.id;
		try {
			const deleted = await fetch(`http://localhost:3000/api/store/${itemId}`, {
				method: "DELETE"
			})

			router.push("/");
		} catch (error) {
			console.log(error);
		}
	}

	const handleDelete = async () => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.isConfirmed) {
				setIsDeleting(true);
				Swal.fire(
					'Deleted!',
					'Your file has been deleted.',
					'success'
				)
			}
		})
	}

    return(
		<section className="main-section shop-detail">
			{isDeleting
				? <div className="spinner">
					<Spinner animation="border" />
				</div>
				: <Container>
					<Row className="m-b-30">
						<Col md={6}>
							<img src="../images/shop.jpg" alt="Shop"/>
						</Col>
						<Col md={6} className="product-content">
							<div>
								<h1>{stores.title}</h1>
								<p>{stores.description}</p>
								<Link href={`/${stores._id}/edit`}>
									<Button variant="primary" className="shop-btn edit">Add Item</Button>
								</Link>
								<Button variant="danger" className="shop-btn" onClick={() => handleDelete()}>Delete Shop</Button>
							</div>
						</Col>
					</Row>
					<hr/>
					<Row className="m-t-30">
						{stores.items.map( (items, index) => {
							return(
								<Col md={4} key={index}>
									<Card>
										<Card.Img variant="top" src="../images/product.jpg" />
										<Card.Body>
											<Card.Title>{items.name}</Card.Title>
											<Card.Text>
												<span>IDR. {items.price}</span> | <span>Quantity: {items.amount}</span>
												<br />
												Some quick example text to build on the card title and make up the bulk of the card's content.
											</Card.Text>
											<Button variant="success" disabled>Buy</Button>
										</Card.Body>
									</Card>
								</Col>
							)
						})}
						{/* <h1>{stores.items[0].name}</h1> */}
					</Row>
				</Container>
			}
		</section>
    )
}

Store.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/store/${id}`);
    const { data } = await res.json();

    return { stores: data }
}

export default Store;