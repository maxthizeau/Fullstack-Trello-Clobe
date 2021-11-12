import { NextPage } from 'next'
import { useApolloClient, useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import { DisplayError } from '@/components/utils'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../../public/images/TodoLogo.png'
import useForm from '@/lib/useForm'
import { useAuthToken } from '@/lib/auth'
import { useRouter } from 'next/router'
import { CURRENT_USER_QUERY } from '@/graphql/currentUser'
const StyledForm = styled.div`
  height: 60vh;
  padding: 0;
  margin: 45px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    width: 60%;
    background-color: white;
    border-radius: 3px;
    padding: 25px 40px;
    box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  }

  h2 {
    text-align: center;
    color: #5e6c84;
    font-size: 18px;
    letter-spacing: -0.01em;
    line-height: 28px;
    margin-top: 10px;
    margin-bottom: 25px;
    font-weight: bold;
  }

  .imageContainer {
    width: 40%;
    height: 30px;
    margin: 100px;
    text-align: center;
  }

  .linkList {
    list-style: none;
    text-align: center;
    padding: 0;
  }
  .linkList li {
    display: inline;
    font-size: 0.9rem;

    :not(:first-child)::before {
      content: ' • ';
      margin: 0 8px 0px 4px;
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
        publicId
      }
    }
  }
`

const GET_USER_QUERY = gql`
  query authenticatedItem($id: Int!) {
    user(id: $id) {
      id
      email
      name
    }
  }
`

interface ISignInInputs {
  email: string
  password: string
}

interface IForm {
  inputs: ISignInInputs
  handleChange: (e: any) => void
  resetForm: () => void
  // clearForm: () => void | null
}

const SignInPage: NextPage = () => {
  const router = useRouter()
  const apolloClient = useApolloClient()
  const [_, setAuthToken] = useAuthToken()

  const { inputs, handleChange, resetForm }: IForm = useForm<ISignInInputs>({
    email: '',
    password: '',
  })

  const [loginMutation, { data, error, loading, client }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: (data) => {
        //
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await loginMutation({
      variables: inputs,
      update(cache, { data }) {
        const user = data?.login?.user

        if (user) {
          setAuthToken(data.login.token)
          console.log('Update done')
        }
      },
    })
      .catch((err) => {
        console.log('There is an error : ', err.message)
      })
      .then(() => {
        // apolloClient.resetStore()
        router.push('/')
      })
  }

  return (
    <StyledForm>
      <div className="imageContainer">
        <Image className="image" src={logo} />
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>
        {error && <DisplayError error={error} />}

        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <button type="submit">Sign in </button>
        <hr />

        <ul className="linkList">
          <li>
            <Link href="#">Sign up for an account</Link>
          </li>
          <li>
            <Link href="#">Can't log in ?</Link>
          </li>
        </ul>
      </form>
    </StyledForm>
  )
}

export default SignInPage
