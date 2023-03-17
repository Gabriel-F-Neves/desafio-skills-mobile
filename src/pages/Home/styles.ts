import styled from 'styled-components/native'
import { Card } from "react-native-paper";

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

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

export const CardLivro = styled(Card)`
margin-bottom: 15px;
margin-left: 10px;
margin-right: 10px;
padding: 10px;
justify-content: center;
align-self: center;
display: flex;
width: 350px;
text-align: justify;
background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const CardTitle = styled.Text`
margin-top: 8px;
margin-left: 10px;
font-weight: bold;
font-size: 20px;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const CardLevel = styled.Text`
margin-top: 8px;
margin-left: 10px;
margin-bottom: -40px;
font-weight: normal;
font-size: 20px;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const CardDescription = styled.Text`
padding: 10px;
font-weight: light;
font-size: 20px;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const CardCover = styled(Card.Cover)`
width: 100px;
height: 100px;
border-radius: 50px;
align-items: stretch;
align-self: flex-start;
`

export const CardContent = styled(Card.Actions)`
display: flex;
align-self: flex-start;
`
