import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
// reactstrap components
import Swal from 'sweetalert2';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
// core components
// import ColorNavbar from '../components/Navbars/ColorNavbar.js';
// import DemoFooter from '../components/Footers/DemoFooter.js';
import userAPI from '../utils/userAPI';
const SignIn = ({ setUserState, user }) => {
  const [emailFocus, setemailFocus] = useState(undefined);
  const [passwordFocus, setpasswordFocus] = useState(undefined);
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    document.body.classList.add('login-page');
    return function cleanup() {
      document.body.classList.remove('login-page');
    };
  }, []);
  const [state, setState] = useState({
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
    // event.preventDefault();
    // alert(state.email);
    // alert(state.password);
    if (state.email && state.password) {
      userAPI
        .loginUser({
          email: state.email,
          password: state.password,
        })
        .then((res) => {
          if (res.status === 200) {
            setUserState(res.data);
            return history.push('/comments');
          }
        })
        .catch((err) => {
          console.log(err.response.data.errors);
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
        text: 'Both fields re required',
      });
    }
  };
  return (
    <>
      {/* <ColorNavbar /> */}
      <div className='page-header'>
        <div className='squares square1' />
        <div className='squares square2' />
        <div className='squares square3' />
        <div className='squares square4' />
        <div className='squares square5' />
        <div className='squares square6' />
        <div className='page-header-image' />
        <Container>
          <Col className='mx-auto' lg='5' md='8'>
            <Card className='card-login'>
              <Form action='' className='form' method=''>
                <CardHeader>
                  <CardImg
                    alt='...'
                    src={require('../assets/img/square-purple-1.png').default}
                  />
                  <CardTitle tag='h4'>Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={classnames('input-lg', {
                      'input-group-focus': emailFocus,
                    })}
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='tim-icons icon-single-02' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Email...'
                      type='text'
                      onFocus={(e) => setemailFocus(true)}
                      onBlur={(e) => setemailFocus(false)}
                      onChange={onChange}
                      name='email'
                    />
                  </InputGroup>
                  <InputGroup
                    className={classnames('input-lg', {
                      'input-group-focus': passwordFocus,
                    })}
                  >
                    <InputGroupAddon addonType='prepend'>
                      <InputGroupText>
                        <i className='tim-icons icon-caps-small' />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder='Password...'
                      type='password'
                      onFocus={(e) => setpasswordFocus(true)}
                      onBlur={(e) => setpasswordFocus(false)}
                      onChange={onChange}
                      name='password'
                    />
                  </InputGroup>
                </CardBody>
                <CardFooter className='text-center'>
                  <Button
                    block
                    className='btn-round'
                    color='primary'
                    type='button'
                    onClick={handleFormSubmit}
                    size='lg'
                  >
                    Login
                  </Button>
                </CardFooter>
                <div className='pull-left ml-3 mb-3'>
                  <h6>
                    <a
                      className='link footer-link'
                      href='#pablo'
                      onClick={() => history.push('register')}
                    >
                      Create Account
                    </a>
                  </h6>
                </div>
                <div className='pull-right mr-3 mb-3'>
                  <h6>
                    <a
                      className='link footer-link'
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                    >
                      Need Help?
                    </a>
                  </h6>
                </div>
              </Form>
            </Card>
          </Col>
        </Container>
      </div>
      {/* <DemoFooter /> */}
    </>
  );
};

export default SignIn;
