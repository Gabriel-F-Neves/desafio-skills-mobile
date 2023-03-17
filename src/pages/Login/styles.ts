import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`

export const Cabecalho = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

export const Conteudo = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const Rodape = styled.View`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
`

export const Titulo = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  /* border-width: 2px; */
  border-radius: 10px;
  width: 80%;
  margin: 10px;
  padding: 13px 15px;
  font-weight: bold;
  elevation: 5;
`

export const Button = styled.TouchableOpacity`
background-color: ${({ theme }) => theme.COLORS.GRAY_500};
width: 80%;
padding: 20px;
border-radius: 10px;
`

export const TextButton = styled.Text`
color: #fff;
text-align: center;
font-weight: bold;
font-size: 18px;
`

export const Link = styled.TouchableOpacity`
padding: 20px;
`

export const TextLink = styled.Text`
color: ${({ theme }) => theme.COLORS.GRAY_700};
font-weight: bold;
font-size: 18px;
`

export const ShowPass = styled.TouchableOpacity`
flex-direction: row;
align-items: center;
justify-content: center;
right: -130px;
bottom: 50px;
width: 50px;
`