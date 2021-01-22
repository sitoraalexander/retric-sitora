import React, { useState, useEffect, useRef, Fragment } from 'react';
import DeleteBtn from '../components/DeleteBtn';
import API from '../utils/API';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from '../components/Grid';
import { Table, Tr, Td } from '../components/Table';
import { ForwardRefInput, FormBtn } from '../components/Form';

import { Input, Button, Media, UncontrolledTooltip } from 'reactstrap';
import { useHistory } from 'react-router-dom';
function Comments({ username }) {
  console.log('USERNAME=');
  let history = useHistory();
  console.log(username);
  // Setting our component's initial state
  const [comments, setComments] = useState([]);
  const [formObject, setFormObject] = useState({
    body: '',
  });

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
                    placeholder='Modify the reuquest...'
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
    <Container>
      <Row>
        <Col size='md-12'>
          <Container>
            <Row>
              <Col size='lg-6'>
                <div style={{ fontSize: '30px', color: 'white' }}>
                  Welcome! <br /> {username}
                </div>
              </Col>
              <Col size='lg-6'>
                <Button
                  className='pull-right'
                  color='neutral'
                  type='button'
                  onClick={() => history.push('/')}
                >
                  <i className='tim-icons icon-button-power' /> Logout
                </Button>
              </Col>
            </Row>
          </Container>

          <form className='mt-3'>
            <Col size='sm-12'>
              <Input
                placeholder='Write a nice reply or go home...'
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
      <Container>
      <form> 
						<Input value={formObject.search} onChange={handleInputChange} name='search' id='search' placeholder='Enter your title search here' />
						<FormBtn
							onClick={handleFormSubmit}>
							Search
						</FormBtn>
					</form>
      </Container>
      ,
      <Row>
        <Col size='md-12'>
        {comments.length ? (
					<Table>
						<Tr>
							<Th>Member</Th>
							<Th>Title</Th>
							<Th>Detail</Th>
							<Th>Offer</Th>
							<Th>Date</Th>
						</Tr>
						{comments.map(comment => (
							<Tr key={comment._id}>
								<Td><strong>{comment.username}</strong> 
								</Td>
								<Td>
									<Link
										to={"/comments/" + comment._id}
										style={{ textAlign: "left", display: "block" }}>
										<span>{comment.title}</span>
									</Link>
								</Td>
								<Td>{comment.detail}</Td>
								<Td>{comment.offer}</Td>
								<Td>{UtilDate.formatDate(comment.date)}</Td>
							</Tr>
						))}
					</Table>
				) : (
					<h3>No Results to Display</h3>
				)}
        </Col>
      </Row>
      ,
    </Container>
  );
}

export default Comments;
