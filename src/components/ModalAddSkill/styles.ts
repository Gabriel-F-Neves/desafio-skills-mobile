import styled from 'styled-components/native'

export const ButtonAdd = styled.TouchableOpacity`
margin-top: 60px;
margin-bottom: 60px;
align-self: center;
align-items: center;
justify-content: center;
width: 200px;
height: 50px;
border-radius: 10px;
background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const TextAdd = styled.Text`
font-weight: bold;
font-size: 18px;
color: ${({ theme }) => theme.COLORS.WHITE};
`