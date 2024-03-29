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
										<Card.Img variant="top" src="../images/shop.jpg" alt="Shop" />
										<Card.Body>
											<Card.Title>
												<Link href={`/${store._id}`}>
													<a>{store.title}</a>
												</Link>
											</Card.Title>
											<Card.Text>
												{store.description}
											</Card.Text>
											<Link href={`/${store._id}`}>
												<Button variant="primary" className="card-btn view w-100">View</Button>
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