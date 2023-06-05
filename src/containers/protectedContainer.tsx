import React from "react";
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, Route, Routes } from 'react-router-dom';
import About from './about';
// import RouteKeys from '../../constants/route-keys'
// import { useAuth } from '../../context/authContext'
// import { RouteElement } from '../../interfaces/_common'
// import { Unauthorized } from '../Unauthorized'
import { Sidebar } from '../components/sidebar';
import Home from './home';
import Users from "./users";

export const _routes: any = [
    {
        title: 'Home',
        route: '/home',
        key: "home",
        component: Home,
        end: true,
        display: true,
        icon: 'home'
    },

    {
        title: 'Users',
        route: '/users',
        key: "users._key",
        display: true,
        hasChild: false,
        component: Users,
        icon: 'group'
    },
    {
        title: 'ABOUT',
        route: '/about-us',
        key: "RouteKeys.user_management._key",
        display: true,
        hasChild: false,
        component: About,
        icon: 'info'
    },

    // {
    //     title: 'ABOUT',
    //     route: '/user-management',
    //     key: RouteKeys.user_management._key,
    //     display: true,
    //     hasChild: true,
    //     component: UserManagement,
    //     icon: UserIcon
    // }
]
export const ProtectedContainer = (props: any) => {
    console.log(props);

    const [ismenuOpen, setIsMenuOpen] = React.useState(false);
    const setSidemenuOpen = (data: any) => {
        setIsMenuOpen(data);
        console.log(ismenuOpen);

    };

    // const auth = useAuth()
    return (
        <>
            {props.isAuthenticated ? <div id='side-nav-bar'> <Sidebar setSidemenuOpen={setSidemenuOpen} routeLink={_routes}/> </div> : ""}
            <div className={ismenuOpen ? 'menu-open' : 'menu-close'}>


                <header >

                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand href="#home">App</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">

                                </Nav>
                                {props.isAuthenticated ? <> <Link to="/home" className='m-2'>Home</Link>  <Link className='m-2' to="/about-us">About</Link> <Button onClick={props.Logout}>Logout</Button></> : <Nav.Link >Login</Nav.Link>}
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>



                </header>
                <div id='content' className={'flex-col w-full md:w-[calc(100%-4rem)]'} >
                    <Routes>
                        <Route exact path='/about-us' {...props} element={<About />} />
                        <Route exact {...props} path="/home" element={<Home />} />
                        <Route exact {...props} path="/users" element={<Users />} />
                        <Route
                        path="*"
                        element={<h1 className="text-9xl font-bold">Not found!</h1>}
                    />
                    </Routes>
                </div>

            </div>
        </>
    )
}
