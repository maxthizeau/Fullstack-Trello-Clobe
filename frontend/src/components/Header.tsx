// Imports :

// React & Packages
import Link from 'next/link'
import styled from 'styled-components'
// Components
// Hooks & Lib
// GraphQL Queries & Mutations
// Generated TypeScript

// End Imports

const HeaderStyles = styled.header`
  padding: 10px;
  background-color: darkblue;

  h1 {
    color: white;
    font-size: 3rem;
    text-align: center;
    text-transform: uppercase;
  }

  nav {
    width: 100%;
  }

  nav ul {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    text-align: center;
  }

  a {
    text-decoration: none;
    color: white;
  }
`

const Header = () => {
  return (
    <HeaderStyles>
      <nav>
        <ul>
          <li>
            <Link href="#">Account</Link>
          </li>
          <li>
            <Link href="#">My Boards</Link>
          </li>
          <li>
            <Link href="#">My Teams</Link>
          </li>
        </ul>
      </nav>
    </HeaderStyles>
  )
}

export default Header
