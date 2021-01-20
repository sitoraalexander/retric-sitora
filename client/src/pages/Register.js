import React, { useRef, useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classnames from 'classnames';
import Axios from 'axios';
import Swal from 'sweetalert2';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from 'reactstrap';

// core components
import ColorNavbar from '../components/Navbars/ColorNavbar';
import DemoFooter from '../components/Footers/DemoFooter.js';
import userAPI from '../utils/userAPI';
import { Redirect, Link, useHistory } from 'react-router-dom';
const Register = ({ authenticate, user }) => {
  const [squares1to6, setSquares1to6] = useState('');
  const [squares7and8, setSquares7and8] = useState('');
  const [fullNameFocus, setFullNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const wrapper = React.useRef(null);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add('register-page');
    document.documentElement.addEventListener('mousemove', followCursor);
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.documentElement.removeEventListener('mousemove', followCursor);
    };
  }, []);
  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      'perspective(500px) rotateY(' +
        posX * 0.05 +
        'deg) rotateX(' +
        posY * -0.05 +
        'deg)'
    );
    setSquares7and8(
      'perspective(500px) rotateY(' +
        posX * 0.02 +
        'deg) rotateX(' +
        posY * -0.02 +
        'deg)'
    );
  };
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  let history = useHistory();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (state.email && state.password && state.username) {
      userAPI
        .signup({
          username: state.username,
          email: state.email,
          password: state.password,
        })
        .then(async (res) => {
          if (res.status === 200) {
            await localStorage.setItem('token', res.data.token);
            authenticate();
            return history.push('/comments');
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.response.data.errors[0].msg,
          });
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      });
    }
  };

  return (
    <>
      {/* <ColorNavbar /> */}
      <div className='wrapper' ref={wrapper}>
        <div className='page-header'>
          <div className='page-header-image' />
          <Container>
            <Row>
              <Col className='mx-auto' lg='5' md='12'>
                <div
                  className='square square-7'
                  id='square7'
                  style={{ transform: squares7and8 }}
                />
                <div
                  className='square square-8'
                  id='square8'
                  style={{ transform: squares7and8 }}
                />
                <Card className='card-register'>
                  <CardHeader>
                    <CardImg
                      alt='...'
                      src={require('assets/img/square1.png').default}
                    />
                    <CardTitle tag='h4'>Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form className='form'>
                      <InputGroup
                        className={classnames({
                          'input-group-focus': fullNameFocus,
                        })}
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='tim-icons icon-single-02' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='UserName'
                          type='text'
                          onFocus={(e) => setFullNameFocus(true)}
                          onBlur={(e) => setFullNameFocus(false)}
                          onChange={onChange}
                          name='username'
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          'input-group-focus': emailFocus,
                        })}
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='tim-icons icon-email-85' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Email'
                          type='text'
                          onFocus={(e) => setEmailFocus(true)}
                          onBlur={(e) => setEmailFocus(false)}
                          onChange={onChange}
                          name='email'
                        />
                      </InputGroup>
                      <InputGroup
                        className={classnames({
                          'input-group-focus': passwordFocus,
                        })}
                      >
                        <InputGroupAddon addonType='prepend'>
                          <InputGroupText>
                            <i className='tim-icons icon-lock-circle' />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder='Password'
                          type='password'
                          onFocus={(e) => setPasswordFocus(true)}
                          onBlur={(e) => setPasswordFocus(false)}
                          onChange={onChange}
                          name='password'
                        />
                      </InputGroup>
                      <FormGroup check className='text-left'>
                        <Label check>
                          <Input type='checkbox' />
                          <span className='form-check-sign' />I agree to the{' '}
                          <a href='#pablo' onClick={(e) => e.preventDefault()}>
                            terms and conditions
                          </a>
                          .
                        </Label>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      className='btn-round'
                      color='info'
                      type='button'
                      size='lg'
                      onClick={handleFormSubmit}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
          <div className='register-bg' />
          <div
            className='square square-1'
            id='square1'
            style={{ transform: squares1to6 }}
          />
          <div
            className='square square-2'
            id='square2'
            style={{ transform: squares1to6 }}
          />
          <div
            className='square square-3'
            id='square3'
            style={{ transform: squares1to6 }}
          />
          <div
            className='square square-4'
            id='square4'
            style={{ transform: squares1to6 }}
          />
          <div
            className='square square-5'
            id='square5'
            style={{ transform: squares1to6 }}
          />
          <div
            className='square square-6'
            id='square6'
            style={{ transform: squares1to6 }}
          />
        </div>
        {/* <DemoFooter /> */}
      </div>
    </>
  );
};

export default Register;
