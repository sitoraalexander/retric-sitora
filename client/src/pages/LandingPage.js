import React, { useEffect, useRef } from 'react';
// react plugin used to create charts
import { Line } from 'react-chartjs-2';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  ListGroupItem,
  ListGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';

import "../style.css"

// core components
import ColorNavbar from '../components/Navbars/ColorNavbar.js';
import DemoFooter from '../components/Footers/DemoFooter.js';

import { chartExample1 } from '../variables/charts.js';

const LandingPage = () => {
  const wrapper = useRef(null);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    // wrapper.current.scrollTop = 0;
    document.body.classList.add('landing-page');
    return function cleanup() {
      document.body.classList.remove('landing-page');
    };
  }, []);
  return (
    <>
      <ColorNavbar />
      <div className='wrapper' ref={wrapper}>
        <div className='page-header'>
          <img
            alt='...'
            className='path'
            src={require('../assets/img/blob.png').default}
          />
          <img
            alt='...'
            className='path2'
            src={require('../assets/img/path2.png').default}
          />
          <img
            alt='...'
            className='shapes triangle'
            src={require('../assets/img/triunghiuri.png').default}
          />
          <img
            alt='...'
            className='shapes wave'
            src={require('../assets/img/waves.png').default}
          />
          <img
            alt='...'
            className='shapes squares'
            src={require('../assets/img/patrat.png').default}
          />
          <img
            alt='...'
            className='shapes circle'
            src={require('../assets/img/cercuri.png').default}
          />
          <Container>
            <Row className='row-grid justify-content-between align-items-center text-left'>
              <Col lg='6' md='6'>
                <h1 className='text-white'>
                  Finally a place <br />
                  <span className='text-white'>where you can exchange</span>
                  <span className='text-white'> skill, experience, knowledge, and talent!</span>
                </h1>
                <p className='text-white mb-3'>
                  Retric is an online community in which people trade services with one another in exchange for another. Imagine! You could learn the basics of how to play the guitar and in exchange you could provide design services. The terms of agreement are based on a barter system. Each user can negotiate their form of cashless compensation. NO MONEY ALLOWED!
                </p>
                <div className='btn-wrapper mb-3'>
                  <p className='category text-success d-inline'>
                    Learn more
                  </p>
                  <Button
                    className='btn-link'
                    color='success'
                    href='#pablo'
                    onClick={(e) => e.preventDefault()}
                    size='sm'
                  >
                    <i className='tim-icons icon-minimal-right' />
                  </Button>
                </div>
                <div className='btn-wrapper'>
                  <div className='button-container'>
                    <Button
                      className='btn-icon btn-simple btn-round mr-1'
                      color='neutral'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className='fab fa-twitter' />
                    </Button>
                    <Button
                      className='btn-icon btn-simple btn-round mr-1'
                      color='neutral'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className='fab fa-instagram' />
                    </Button>
                    <Button
                      className='btn-icon btn-simple btn-round'
                      color='neutral'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className='fab fa-facebook' />
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg='6' md='5'>
                <img
                  alt='...'
                  className='img-fluid b-hands'
                  src={require('../assets/img/people-connect.png').default}
                />
              </Col>
            </Row>
          </Container>
        </div>
        
        <DemoFooter />
      </div>
    </>
  );
};
export default LandingPage;
