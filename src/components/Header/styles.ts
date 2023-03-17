import styled from 'styled-components/native'

export const Container = styled.View`
width: 100%;
height: 20%;
flex-direction: row;
align-items: center;
justify-content: center;
background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const Logo = styled.Image`
width: 150px;
height: 150px;
`

export const LogoutButton = styled.TouchableOpacity`
position: absolute;
right:20px;
`