import { currentUserQuery } from '@/generated/currentUserQuery'
import { useQuery } from '@apollo/client'
import gql from 'graphql-tag'
import { CURRENT_USER_QUERY } from './graphql'

export const useUser = () => useQuery<currentUserQuery>(CURRENT_USER_QUERY)
