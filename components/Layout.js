import Head from 'next/head';
import Navigation from './Navigation'

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Next.js Store</title>
        </Head>
        <Navigation />
        {children}
    </>
)

export default Layout;