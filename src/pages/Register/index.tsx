import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Container, ContainerButton, ContainerHeader, ContainerInput, EyeVisibleConfirmPass, EyeVisiblePass, Input, TextButton } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import Api from "../../api/AxiosInstance";
import { Titulo } from "../Login/styles";

export function Register({ navigation }) {
  const [login, setLogin] = useState(null);
  const [password, setPassword] = useState(null);
  const [validPass, setValidPass] = useState(null);
  const [hidePass, setHidePass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);

  const handleSave = async () => {
    if(password === validPass){
      await Api.post(
          "/auth/registro",
          {             
            userLogin: login ,
            userPassword: password             
          }
      ).then(res => {
          if(res.status === 200){
            Alert.alert(
              "Sucesso!",
              "Usuário registrado!",
              
            )
              setTimeout(() => {
                console.log("Delayed for 3 second.");
                navigation.navigate('Login');
              }, 3000);
          }
      }).catch((err) => {
          
      })
  }else{
      Alert.alert(
        "Dados incorretos",
        "As senhas digitadas não conferem!",
        [
          {
            text: "Tentar novamente",
            onPress: () => {}
          },
          {
            text: "Cancelar",
            onPress: () => {
              navigation.navigate('Login')
            }
          }
        ]
      )
  }
  };

  return (
    <>
      <Container>
        <ContainerHeader>
            <Titulo>Registre-se</Titulo>
        </ContainerHeader>
        <ContainerInput>
          <Input
            placeholder="Nome Completo"
            onChangeText={(value) => {
                setLogin(value);
            }}
            />

          <Input
            placeholder="Senha"
            secureTextEntry={hidePass}
            onChangeText={(value) => {
                setPassword(value);
            }}
            />

          <EyeVisiblePass
            onPress={() => setHidePass(!hidePass)}
            >
            {hidePass ? (
                <>
                <Ionicons name="eye-off-outline" size={24} />
              </>
            ) : (
                <>
                <Ionicons name="eye-outline" size={24} />
              </>
            )}
          </EyeVisiblePass>

          <Input
            placeholder="Validar senha"
            secureTextEntry={hideConfirmPass}
            onChangeText={(value) => {
                setValidPass(value);
            }}
            />
          <EyeVisibleConfirmPass
            onPress={() => setHideConfirmPass(!hideConfirmPass)}
          >
            {hideConfirmPass ? (
                <>
                <Ionicons name="eye-off-outline" size={24} />
              </>
            ) : (
                <>
                <Ionicons name="eye-outline" size={24} />
              </>
            )}
          </EyeVisibleConfirmPass>
        </ContainerInput>

        <ContainerButton>
          <Button
            activeOpacity={0.7}
            onPress={() => {
              handleSave();
            }}
          >      
            <TextButton>Cadastrar</TextButton>
          </Button>
        </ContainerButton>
      </Container>
    </>
  );
}
