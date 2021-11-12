// Imports :

// React & Packages
import { FC } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
// Components
import { CreateTeamPopup } from './board/features/CreateTeamPopup'
// Hooks & Lib
// GraphQL Queries & Mutations
// Generated TypeScript

// End Imports

const GlobalStyles = createGlobalStyle`
    @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto/Roboto-Regular.ttf')format('truetype');
    font-weight: normal;
}
    @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto/Roboto-Bold.ttf')format('truetype');
    font-weight:bold
}
    @font-face {
    font-family: 'Roboto';
    src: url('/fonts/Roboto/Roboto-LightItalic.ttf')format('truetype');
    font-style:italic
}
html{
  --mainBlue: #587fec;
  --secondBlue:#7ea5e3;
  --red: #ff0000;
  --black: #393939;
  --white: #f6f6f6;
  --grey: #3A3A3A;
  --lightGrey: #e1e1e1;
  --offWhite:#ededed;
  --maxWidth: 100vw;
  --input-border: #DFE1E6;
  --input-focus-h: 245;
  --input-focus-s: 100%;
  --input-focus-l: 42%;
  --bs :0 12px 24px 0 rgba(0,0,0,0.09);
  box-sizing: border-box;  
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
    
    font-family: 'Roboto', sans-serif;
    background-color: #0093E9;
background-image: -webkit-linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
background-image: -moz-linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  background-image: -o-linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
  /* background-color: #F9FAFC; */
    min-height: 100vh;
    margin:0;


}

input {
    width: 100%;
    font-size: 14px;    
    font-family: inherit;
    padding: 0.5em 0.75em;
    background-color: #FAFBFC;
    border: 2px solid var(--input-border);
    border-radius: 4px;
    height: 44px;
    transition: 180ms box-shadow ease-in-out;
    margin:10px 0px;
  }
  .input:focus {
    border-color: hsl(
      var(--input-focus-h),
      var(--input-focus-s),
      var(--input-focus-l)
    );
    box-shadow: 0 0 0 3px
      hsla(
        var(--input-focus-h),
        var(--input-focus-s),
        calc(var(--input-focus-l) + 40%),
        0.8
      );
    outline: 3px solid transparent;
  }

  select {
    width: 100%;
    font-size: 14px;    
    font-family: inherit;
    padding: 0.5em 0.75em;
    background-color: #FAFBFC;
    border: 2px solid var(--input-border);
    border-radius: 4px;
    height: 44px;
    transition: 180ms box-shadow ease-in-out;
    margin:10px 0px;
  }

  button {
    width:100%;
    margin:20px 0px;
    /* background:#0093E9; */
    background-color: var(--mainBlue);
    color:white;
    font-weight: bold;
    padding: .6em 1.3em;
    text-decoration: none;
    border:0px;
    font-size: 14px;
    border-radius: 3px;
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid hsl(0,0%,80%);
    margin: 1em 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: #0052CC;
}

.split {
    display: flex;
    width: 100%;
    justify-content: center;
    text-align: center;
  }
  .split span {
    flex: 1;
  }

.visible {
  display:block;
}
.hidden {
  display:none;
}
  
`

const InnerStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 2rem;
`

const Page: FC = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      {/* <Header /> */}
      <CreateTeamPopup />
      <InnerStyles>{children}</InnerStyles>
    </div>
  )
}

export default Page
