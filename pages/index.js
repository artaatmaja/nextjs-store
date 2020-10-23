import { Col, Container, Row, Button, Card } from "react-bootstrap"
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'


const Home = ({ stores }) => {
	return (
		<>
			<section className="main-section">
				<Container>
					<Row>
						<Col>
							<h1 className="main-title">Next.js Stores</h1>
						</Col>
					</Row>
					<Row>
						{stores.map( store => {
							return(
								<Col md={4} key={store._id}>
									<Card>
										<Card.Img variant="top" src="http://via.placeholder.com/286x180" />
										<Card.Body>
											<Card.Title>
												<Link href={`/${store._id}`}>
													<a>{store.title}</a>
												</Link>
											</Card.Title>
											<Card.Text>
												Some quick example text to build on the card title and make up the bulk of the card's content.
											</Card.Text>
											<Link href={`/${store._id}`}>
												<Button variant="primary" className="card-btn view">View</Button>
											</Link>
											<Link href={`/${store._id}/edit`}>
												<Button variant="primary" className="card-btn edit">Edit</Button>
											</Link>
										</Card.Body>
									</Card>
								</Col>
							)
						})}
					</Row>
				</Container>
			</section>
		</>
	)
}

Home.getInitialProps = async () => {
	const res = await fetch('http://localhost:3000/api/store');
	const { data } = await res.json();

	return { stores: data }
}

export default Home;