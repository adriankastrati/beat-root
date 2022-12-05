import styled from 'styled-components'
import { theme } from '../../../common'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: ${theme.medium};
`

export default function Modal(){
    return <Container></Container>
}