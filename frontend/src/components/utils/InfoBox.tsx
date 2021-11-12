// Imports :

// React & Packages
import { FC } from 'react'
import styled from 'styled-components'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
// Components
// Hooks & Lib
import { useUser } from '@/lib/useUser'
import { useAuthToken } from '@/lib/auth'
import useAppConfig from '@/lib/appConfig/useAppConfig'
// GraphQL Queries & Mutations
// Generated TypeScript

// End Imports

const InfoBoxStyles = styled.div`
  font-style: italic;
  border-radius: 3px;
  padding: 20px 40px;
  background-color: #ffffff68;
  color: #151536;
  margin-bottom: 30px;
  position: relative;
  display: flex;

  /* flex-direction: column; */
  p {
    flex: max-content;
  }
`

const ContainerButtons = styled.div`
  display: flex;
  gap: 20px;
  /* flex-direction: row; */
  /* flex: 1 0 fit-content; */
`

const ButtonStyles = styled.button`
  /* position: absolute;
  top: 12px;
  right: 20px; */
  /* justify-self: flex-end; */
  width: auto;
  margin: 0;
  cursor: pointer;
  &:hover {
    background: var(--secondBlue);
    transition: 0.2s;
  }
`

export const InfoBox: FC = () => {
  const router = useRouter()
  const [authToken, _set, removeAuthToken] = useAuthToken()
  const apolloClient = useApolloClient()

  async function logout() {
    removeAuthToken() //we clear the authToken
    sessionStorage.clear() // or localStorage
    apolloClient.clearStore().then(() => {
      // apolloClient.resetStore()
      router.push('/sign-in')
    })
  }

  const user = useUser()
  const { showModal, toggleModal } = useAppConfig()
  return (
    <InfoBoxStyles>
      <p>
        Connected as :{' '}
        {user?.data?.authenticatedUser
          ? `${user.data.authenticatedUser.publicId}`
          : `Not logged in`}{' '}
      </p>
      {user?.data?.authenticatedUser && (
        <ContainerButtons>
          <ButtonStyles
            onClick={() => {
              router.push('/')
            }}
          >
            My boards
          </ButtonStyles>

          <ButtonStyles
            onClick={() => {
              router.push('/teams')
            }}
          >
            Teams
          </ButtonStyles>
          <ButtonStyles onClick={toggleModal}>Create a Team</ButtonStyles>
          <ButtonStyles onClick={logout}>Log Out</ButtonStyles>
        </ContainerButtons>
      )}
      {!user?.data?.authenticatedUser && (
        <ButtonStyles
          onClick={() => {
            router.push('/sign-in')
          }}
        >
          Log In
        </ButtonStyles>
      )}
    </InfoBoxStyles>
  )
}
