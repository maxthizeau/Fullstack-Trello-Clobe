// Imports :

// React & Packages
import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
// Components
// Hooks & Lib
// GraphQL Queries & Mutations
// Generated TypeScript

// End Imports

const ErrorStyles = styled.div`
  padding: 2rem;
  background: #ff707052;
  border-radius: 3px;
  margin: 2rem 0;
  border: 1px solid rgba(177, 0, 0, 0.05);

  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`

export const DisplayError = ({ error }: any) => {
  if (!error || !error.message) return null
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error: any, i: number) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Error</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </ErrorStyles>
    ))
  }
  return (
    <ErrorStyles>
      <p data-test="graphql-error">
        <strong>Error</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </ErrorStyles>
  )
}

DisplayError.defaultProps = {
  error: {},
}

DisplayError.propTypes = {
  error: PropTypes.object,
}
