import React, { Component } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

class Header extends Component {

	constructor(props){
		super(props);

		this.state = {
			isOpen: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		const{ isOpen } = this.state;
		this.setState({ isOpen: !isOpen });
	}

	render(){

		const { isOpen } = this.state;
		const { visualize, clearGrid, ChangeAlgo } = this.props;

		return (
			<div>
			  <Navbar color="dark" dark expand="md">
			    <NavbarBrand href="/"><h3>PathFinder</h3></NavbarBrand>
			    <NavbarToggler onClick={this.toggle} />

			    <Collapse isOpen={isOpen} navbar>
			      <Nav className="ml-auto" navbar>
			      
			        <UncontrolledDropdown nav inNavbar>
			          <DropdownToggle nav caret disabled={this.props.visualized}>
			           <Button>
			            Choose Algorithm
			           </Button>
                         </DropdownToggle>
                         <DropdownMenu right>
                           <DropdownItem onClick={() => ChangeAlgo("BFS")}>
                            BFS
                           </DropdownItem>

                           <DropdownItem onClick={() => ChangeAlgo("DFS")}>
                            DFS
                           </DropdownItem>

                           <DropdownItem onClick={() => ChangeAlgo("Dijkstra")}>
                            Dijkstra
                           </DropdownItem>

                            <DropdownItem onClick={() => ChangeAlgo("SPFA")}>
                            SPFA
                           </DropdownItem>
                         </DropdownMenu>
			        </UncontrolledDropdown>

			        <NavItem>
			          <NavLink href="#dj" onClick={visualize}><Button>Visualize</Button></NavLink>
			        </NavItem>

			        <NavItem>
			          <NavLink href="#clear" onClick={clearGrid}><Button>Clear Grid</Button></NavLink>
			        </NavItem>

			      </Nav>
			    </Collapse>

			  </Navbar>
			</div>
		);
	}
}

export default Header;