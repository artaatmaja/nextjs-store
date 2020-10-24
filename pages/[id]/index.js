import fetch from 'isomorphic-unfetch'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Button, Spinner, Container, Row, Col, Card} from 'react-bootstrap'
import Swal from 'sweetalert2'

const Store = ({ store }) => {
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
		<section className="main-section">
			{isDeleting
				? <div className="spinner">
					<Spinner animation="border" />
				</div>
				: <Container>
					<Row>
						<Col md={{ span: 6, offset: 3 }}>
							<Card>
								<Card.Img variant="top" src="http://via.placeholder.com/286x180" />
								<Card.Body>
									<Card.Title>
										{store.title}
									</Card.Title>
									<Card.Text>
										{store.description}
									</Card.Text>
									<Button 
										variant="danger" 
										className="card-btn view"
										onClick={() => handleDelete()}
									>
										Delete
									</Button>
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			}
		</section>
    )
}

Store.getInitialProps = async ({ query: { id } }) => {
    const res = await fetch(`http://localhost:3000/api/store/${id}`);
    const { data } = await res.json();

    return { store: data }
}

export default Store;