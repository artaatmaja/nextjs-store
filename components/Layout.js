import Head from 'next/head';
import Navbar from './Navigation'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Next.js Store</title>
        </Head>
        <Navbar />
        {children}
    </>
)

export default Layout;