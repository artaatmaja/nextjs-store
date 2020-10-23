import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Link from 'next/link'

const Navigation = () => {
    return (
        <>
            <Navbar className="next-nav" expand="lg" fixed="top">
                <Navbar.Brand>
                    <Link href="/">
                        <a className="next-logo">Arta Kusuma</a>
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="w-100">
                        <Link href="/"><a className="nav-item">Home</a></Link>
                        <Link href="/product"><a className="nav-item">Product</a></Link>
                        <Link href="/about"><a className="nav-item">About</a></Link>
                        <Link href="/contact"><a className="nav-item">Contact</a></Link>
                        <Link href="/new"><a className="nav-item ml-auto">Add item +</a></Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation

