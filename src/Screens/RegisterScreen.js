import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import Center from '../Components/Center'
import Message from '../Components/Message'
import Loader from '../Components/Loader'
import {
  nameInputChangeHandler,
  nameInputBlurHandler,
  emailInputBlurHandler,
  emailInputChangeHandler,
  passwordInputBlurHandler,
  passwordInputChangeHandler,
} from '../helpers/validationHelpers'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, userInfo, error } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [userInfo, redirect, history])

  const submitHandler = (e) => {
    e.preventDefault()
    nameInputBlurHandler(name, setNameError)
    emailInputBlurHandler(email, setEmailError)
    passwordInputBlurHandler(password, setPasswordError)
    if (!password == confirmPassword) {
      setPasswordError('Passwords do not match')
    } else if (
      !nameError &&
      !emailError &&
      !passwordError &&
      name !== '' &&
      password !== '' &&
      email !== '' &&
      name !== null &&
      password !== null &&
      email !== null
    ) {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <Form onSubmit={submitHandler}>
        <Center>
          <h2>Sign In</h2>
        </Center>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form.Group className='my-3 ' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              nameInputChangeHandler(e.target.value, setNameError)
            }}
            onBlur={(e) => {
              nameInputBlurHandler(e.target.value, setNameError)
            }}
            placeholder='Enter name'
          />
          <Form.Text className='text-danger fs-6'>
            {nameError && nameError}
          </Form.Text>
        </Form.Group>

        <Form.Group className='my-3 ' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              emailInputChangeHandler(e.target.value, setEmailError)
            }}
            onBlur={(e) => {
              emailInputBlurHandler(e.target.value, setEmailError)
            }}
            placeholder='Enter email'
          />
          <Form.Text className='text-danger fs-6'>
            {emailError && emailError}
          </Form.Text>
        </Form.Group>

        <Form.Group className='my-3 ' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              passwordInputChangeHandler(e.target.value, setPasswordError)
            }}
            onBlur={(e) => {
              passwordInputBlurHandler(e.target.value, setPasswordError)
            }}
            placeholder='Enter password'
          />
          <Form.Text className='text-danger fs-6'>
            {passwordError && passwordError}
          </Form.Text>
        </Form.Group>

        <Form.Group className='my-3 ' controlId='confirmPasswrod'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
            placeholder='Re-enter password'
          />
        </Form.Group>

        <Center>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Center>
      </Form>
      <Row className='py-3'>
        <Col>
          Already a user?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : 'login'}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
