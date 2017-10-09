import styled from 'styled-components';
import { white, getColor } from 'colors'

export const Dep = styled.div`

`

export const Type = styled.div`

`

export const Title = styled.div`
  &:first-letter {
    text-transform: Uppercase;
  }
`

export const Races = styled.div`
  color: ${getColor('darkGrey', 'tonic')}
`
