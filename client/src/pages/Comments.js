import React, { useState, useEffect, useRef, Fragment } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/API';
import { Link } from 'react-router-dom';
// import { Col, Container, Row } from '../components/Grid';
import { Table, Tr, Td } from '../components/Table';
import { ForwardRefInput, FormBtn } from '../components/Form';
import NavbarMain from "../components/Navbars/NavbarMain";

import { Input, Button, Media, UncontrolledTooltip, Row, Col, Container } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import DemoFooter from 'components/Footers/DemoFooter';



function Comments({ username }) {
  console.log('USERNAME=');
  let history = useHistory();
  console.log(username);
  // Setting our component's initial state
  const [comments, setComments] = useState([]);
  const [formObject, setFormObject] = useState({
    body: '',
  });

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

  console.log(comments);

  // get input element ref for focus
  //    const titleInputElRef = useRef();

  // Load all comments and store them with setComments
  useEffect(() => {
    // set user after successful component mount
    setFormObject({
      body: '',
    });

    loadComments();

    // focus on titleInputEl if ref exists
    //   titleInputElRef.current.focus()
  }, [username]);

  // Loads all comments and sets them to comments
  function loadComments() {
    API.getComments()
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  }

  // Deletes a comment from the database with a given id, then reloads comments from the db
  function deleteComment(id) {
    API.deleteComment(id)
      .then((res) => loadComments())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveComment method to save the comment data
  // Then reload comments from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.body) {
      API.saveComment({
        body: formObject.body,
        username,
      })
        .then(loadComments)
        .then(() =>
          setFormObject({
            body: '',
          })
        )
        .catch((err) => console.log(err));
    }
  }
  const CommentSection = ({ comment }) => {
    const [Modify, setModify] = useState(false);
    const [Reply, setReply] = useState('');
    const ModifyRequest = (e) => {
      API.approveRequest({
        username,
        commentId: comment._id,
        body: Reply,
      })
        .then((res) => loadComments())
        .catch((err) => console.log(err));
    };
    const ApproveRequest = () => {
      API.approveRequest({
        commentId: comment._id,
        username,
      })
        .then((res) => loadComments())
        .catch((err) => console.log(err));
    };
    return (
      <Fragment>
        <Media body>
          <Media heading tag='h5' style={{ marginTop: '20px' }}>
            {comment.username} <small className='text-muted'>· Yesterday</small>
          </Media>
          <p>{comment.body}</p>
          {
            <div className='media-footer mb-5'>
              {comment.isApproved ? (
                <Fragment>
                  <Button
                    className='btn-info pull-left'
                    color='primary'
                    href='#pablo'
                    id='tooltip442113005'
                    size='sm'
                  >
                    <i className='tim-icons icon-check-2' /> Approved by{' '}
                    {comment.reply.username}
                  </Button>
                </Fragment>
              ) : (
                  comment.username !== username && (
                    <Fragment>
                      <Button
                        className='btn-simple pull-right'
                        color='primary'
                        href='#pablo'
                        id='tooltip442113005'
                        onClick={ApproveRequest}
                        size='sm'
                      >
                        <i className='tim-icons icon-check-2' /> Approve
                    </Button>

                      <Button
                        className='btn-simple pull-right'
                        color='danger'
                        type='button'
                        onClick={(e) => setModify(!Modify)}
                        size='sm'
                      >
                        <i className='tim-icons icon-pencil' /> Modify and Approve
                    </Button>
                    </Fragment>
                  )
                )}
            </div>
          }
          {comment.reply.body && (
            <Media>
              <a
                className='pull-left'
                href='#pablo'
                onClick={(e) => e.preventDefault()}
              ></a>
              <Media body>
                <Media heading tag='h5'>
                  {comment.reply.username}{' '}
                  <small className='text-muted'>· 2 Days Ago</small>
                </Media>
                <p>{comment.reply.body}</p>
              </Media>
            </Media>
          )}

          {Modify && (
            <Container>
              <form>
                <Col size='sm-12'>
                  <Input
                    placeholder='Modify the request...'
                    rows='4'
                    type='textarea'
                    onChange={(e) => setReply(e.target.value)}
                  />
                </Col>
                <Button
                  className='pull-right mt-2 '
                  color='primary'
                  onClick={ModifyRequest}
                >
                  <i className='tim-icons icon-send' /> Modify
                </Button>
              </form>
            </Container>
          )}
        </Media>
      </Fragment>
    );
  };


  return (
    <>
      <NavbarMain />
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
            <div>
              <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
            <Row>
              <Col>

                <Row>
                  <Col size='lg-6'>
                    <div style={{ fontSize: '30px', color: 'white' }}>
                      Welcome {username}!
                </div>
                  </Col>
                  {/* <Col size='lg-6'> */}
                  {/* <Button
                  className='pull-right'
                  color='neutral'
                  type='button'
                  onClick={() => history.push('/')}
                >
                  <i className='tim-icons icon-button-power' /> Logout
                </Button> */}
                  {/* </Col> */}
                </Row>


                <form className='mt-3'>
                  <Col size='sm-12'>
                    <Input
                      placeholder='Enter your request here...'
                      rows='4'
                      type='textarea'
                      name='body'
                      onChange={handleInputChange}
                    />
                  </Col>
                  <Button
                    className='pull-left mt-2'
                    color='primary'
                    type='button'
                    onClick={handleFormSubmit}
                  >
                    <i className='tim-icons icon-send' /> Submit Request
            </Button>
                </form>
              </Col>
            </Row>
      ,
      <Row>
              <Col size='md-12'>
                {/* {comments.length ? (
					<Table>
						{comments.map(comment => (
							<Tr key={comment._id}>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block" }}>
										<strong>{comment.username}:</strong> {comment.body}
									</Link>
								</Td>
								<Td>{comment.date}</Td>
								<Td>
									<DeleteBtn onClick={() => deleteComment(comment._id)} />
								</Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No Results to Display</h3>
				)} */}
                {comments.map((comment) => {
                  return <CommentSection comment={comment} />;
                })}
              </Col>
            </Row>
      ,
    </Container>
        </div>
      </div>
      <DemoFooter />
    </>
  );
}


export default Comments;
