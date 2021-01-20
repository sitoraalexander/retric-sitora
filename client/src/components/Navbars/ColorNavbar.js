/*!

=========================================================
* BLK Design System PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
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

const ColorNavbar = () => {
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
      <Navbar className={'fixed-top ' + navbarColor} expand='lg'>
        <Container>
          <div className='navbar-translate'>
            <NavbarBrand to='/index' tag={Link} id='tooltip6619950104'>
              <span>Exchange Services</span>
            </NavbarBrand>
            {/* <UncontrolledTooltip delay={0} target='tooltip6619950104'>
              Designed and Coded by Creative Tim
            </UncontrolledTooltip> */}
            <button className='navbar-toggler' id='navigation'>
              <span className='navbar-toggler-bar bar1' />
              <span className='navbar-toggler-bar bar2' />
              <span className='navbar-toggler-bar bar3' />
            </button>
          </div>
          <UncontrolledCollapse navbar toggler='#navigation'>
            <div className='navbar-collapse-header'>
              <Row>
                <Col className='collapse-brand' xs='6'>
                  <a href='#pablo' onClick={(e) => e.preventDefault()}>
                    BLK• <span>PRO React</span>
                  </a>
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
                  className='nav-link'
                  color='primary'
                  size='sm'
                  // target='_blank'
                  onClick={() => {
                    history.push('login');
                  }}
                >
                  <p>Login</p>
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
};

export default ColorNavbar;
