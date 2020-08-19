import React from "react";
import {
		BrowserRouter as Router,
		Switch,
		Route,
		Redirect
} from "react-router-dom";


import HomePage from "../pages/home/home";
import FindPage from "../pages/findPage/FindPage";
import SerieDetail from "../pages/SerieDetail/SerieDetail";

import Navbar from "react-bootstrap/cjs/Navbar";
import Nav from "react-bootstrap/cjs/Nav";



export default function BasicExample() {
		return (
				<Router>
						<div>

								<Navbar bg="dark" variant="dark">
										<Navbar.Brand href="/home">Newton Films</Navbar.Brand>
										<Nav className="mr-auto">
												<Nav.Link href={'/home'}>  Inicio  </Nav.Link>
												<Nav.Link href={'/find'}>  Buscar  </Nav.Link>
												{/*	<Nav.Link href={'/detail'}>  detail  </Nav.Link>*/}
										</Nav>
								</Navbar>


								{/*								<ul>
										<li> <Link to="/home">Home</Link></li>
										<li> <Link to="/find">Finder</Link> </li>
										<li> <Link to="/detail">Detail</Link> </li>
								</ul>*/}

								<div style={{padding:'1em 0' }}>
										<Switch>
												<Route exact path="/home" component={HomePage} />
												<Route exact path="/find" component={FindPage} />
												<Route exact path="/serieDetail/" component={SerieDetail} />
												<Redirect to='/home' />
										</Switch>
								</div>
						</div>
				</Router>
		);
}

// You can think of these components as "pages"
// in your app.


