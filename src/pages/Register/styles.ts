import styled from 'styled-components/native'

export const Container = styled.View`
flex: 1;
justify-content: space-between;
background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const ContainerHeader = styled.View`
flex: 1;
align-items: center;
justify-content: center;
`

export const ContainerInput = styled.View`
flex: 1;
padding-left: 40;
padding-right: 40;
`

export const ContainerButton = styled.View`
flex: 1;
width: 100%;
justify-content: center;
`

export const ContainerTextButton = styled.View`
flex-direction: row;
align-items: center;
justify-content: flex-end;
height: 150px;
padding-right: 30px;
`

export const Button = styled.TouchableOpacity`
width: 200px;
height: 50px;
border-radius: 10px;
background-color: ${({ theme }) => theme.COLORS.GRAY_500};
align-items: center;
align-self: center;
justify-content: center;
`

export const TextButton = styled.Text`
margin-right: 8px;
font-size: 20px;
color: ${({ theme }) => theme.COLORS.WHITE};
`

export const Title = styled.Text`
text-align: center;
font-size: 39px;
font-weight: bold;
color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const SubTitle = styled.Text`
text-align: center;
font-size: 16px;
`

export const Input = styled.TextInput`
background-color: ${({ theme }) => theme.COLORS.WHITE};
padding-top: 4%;
padding-bottom: 4%;
margin-bottom: 6%;
border-radius: 15px;
padding-left: 60px;
elevation: 6;
`

export const EyeVisiblePass = styled.TouchableOpacity`
margin-bottom: -25px;
flex-direction: row;
align-items: center;
justify-content: center;
right: -250px;
bottom: 60px;
width: 50px;
`

export const EyeVisibleConfirmPass = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: center;
right: -250px;
bottom: 60px;
width: 50px;
`
