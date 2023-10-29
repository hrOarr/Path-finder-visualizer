import { Navbar, Container, Nav } from 'react-bootstrap';
import './Navbar.css';

const Header = () => {
    return (
        <Navbar expand="lg" className="" style={{ backgroundColor: '#edf3f5' }}>
            <Container>
                <Navbar.Brand href="/" className="app-name">Visualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/graph-algorithm" style={{fontSize: '22px', fontWeight: '500', textTransform: 'uppercase'}}>Graph</Nav.Link>
                        <Nav.Link href="/sorting-algorithm" style={{fontSize: '22px', fontWeight: '500', textTransform: 'uppercase'}}>Sorting</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;