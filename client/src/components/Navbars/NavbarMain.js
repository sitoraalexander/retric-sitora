import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from 'reactstrap';

import "../../style.css"


const NavbarMain = () => {
  const history = useHistory();
  const [navbarColor, setNavbarColor] = useState('navbar-transparent');
  useEffect(() => {
    window.addEventListener('scroll', changeNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', changeNavbarColor);
    };
  }, []);
  const changeNavbarColor = () => {
    if (
      document.documentElement.scrollTop > 299 ||
      document.body.scrollTop > 299
    ) {
      setNavbarColor('bg-info');
    } else if (
      document.documentElement.scrollTop < 300 ||
      document.body.scrollTop < 300
    ) {
      setNavbarColor('navbar-transparent');
    }
  };
  return (
    <>
      <Navbar className={'fixed-top ' + navbarColor} expand='sm'>
        <Container>
          <div className='navbar-translate '>
            <NavbarBrand to='/index' tag={Link} id='tooltip6619950104' className="col-md-4">

              <img
                alt='retric logo white'
                className="retric-white"
                src={require('../../assets/img/retric-logo-blue.png').default}
              />
            </NavbarBrand>
            <button className='navbar-toggler' id='navigation'>
              <span className='navbar-toggler-bar bar1' />
              <span className='navbar-toggler-bar bar2' />
              <span className='navbar-toggler-bar bar3' />
            </button>
          </div>
          <UncontrolledCollapse navbar toggler='#navigation'>
            <div className='navbar-collapse-header'>
              <Row>
                <Col className='' md='6'>
                  {/* <a href='#pablo' onClick={(e) => e.preventDefault()}> */}
                  {/* <span>Retric</span> */}
                  <img
                    href='#pablo' onClick={(e) => e.preventDefault()}
                    alt='...'
                    className='path'
                    src={require('../../assets/img/retric-logo-white.png').default}
                  />
                  {/* </a> */}
                </Col>
                <Col className='collapse-close text-right' xs='6'>
                  <button className='navbar-toggler' id='navigation'>
                    <i className='tim-icons icon-simple-remove' />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className='ml-auto' navbar>
              <NavItem>
                <Button
                  className='pull-right logout-btn'
                  color='neutral'
                  type='button'
                  onClick={() => history.push('/')}
                >
                  <i className='tim-icons icon-button-power ml-auto' /> Logout
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMain;
