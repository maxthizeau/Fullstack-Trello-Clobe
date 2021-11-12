import { InfoBox } from '@/components/utils'
import { NextPage } from 'next'
import styled from 'styled-components'
import { TeamList } from '@/components/teams/TeamList'

const TeamListContainer = styled.div`
  padding: 20px 40px;
  background: var(--offWhite);
  border-radius: 3px;
`

const TeamsPage: NextPage = () => {
  return (
    <div>
      <InfoBox />
      <TeamListContainer>
        <h2>My teams</h2>
        <TeamList />
      </TeamListContainer>
    </div>
  )
}

export default TeamsPage
