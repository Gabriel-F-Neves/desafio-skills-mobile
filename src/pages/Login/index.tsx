import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Checkbox } from 'react-native-paper';
import Api from "../../api/AxiosInstance";
import {
  storeLocalData,
  retrieveLocalData,
} from "../../services/LocalStorageService";
import { 
  Button, 
  Cabecalho, 
  Container, 
  Conteudo, 
  Input, 
  Link, 
  Rodape, 
  ShowPass, 
  TextButton, 
  TextLink, 
  Titulo 
} from "./styles";
import { DataContext } from "../../context/DataContext";

export function Login ({ navigation }){

    const { armazenaDadosUsuario }:any = useContext(DataContext);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [persistLogged, setPersistLogged] = useState(false);

    const usuarioIncorreto = () => {
      Alert.alert(
        "Dados incorretos",
        "Usuário ou senha estão incorretos",
        [
          {
            text: "Tentar novamente",
            onPress: () => {}
          },
          {
            text: "Cancelar",
            onPress: () => {}
          }
        ]
      )
    };

    const handleLogin = async () => {
      var tokenJwt:any = null;
  
      try{
        const retorno = await Api.post('/auth/login', {
          userLogin: login,
          userPassword: password
        });
  
        if(retorno.status === 200){
  
          tokenJwt = retorno.data;
          
          armazenaDadosUsuario(tokenJwt["jwt-token"]);

          navigation.navigate('Home');
          
          if(persistLogged == true){

            storeLocalData("user", tokenJwt);
          }

        }else{
          console.log('Erro ao realizar a autenticação');
        }
  
      } catch(error){
        console.log('Erro ao realizar a autenticação - ' + JSON.stringify(error));
        usuarioIncorreto();
      }
    };

    const handleRegister = () => {
      navigation.navigate("Register");
    };

    const verifyLogged = async () => {
      try {
        const response = JSON.parse(await retrieveLocalData("user"));

        if (response == null) {
          return;
        }

        armazenaDadosUsuario(response["jwt-token"]);

        navigation.navigate("Home");
      } catch (error) {
        
      }
    };

    useEffect(() => {
      verifyLogged();
    },[])
    
    return(
        <Container>
          <StatusBar style="dark" backgroundColor="transparent" translucent />
        <Cabecalho>
          <Titulo>Bem-Vindo</Titulo>
        </Cabecalho>
  
        <Conteudo>  
          <Input placeholder='Login' onChangeText={setLogin} value={login} />
          <Input placeholder='Senha' secureTextEntry={hidePass} onChangeText={setPassword} value={password} />
          <ShowPass
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
          </ShowPass>

          <Checkbox.Item 
            label="Manter usuário logado" 
            status={persistLogged ? 'checked' : 'unchecked'}
            color={'black'}
            onPress={() => {
              setPersistLogged(!persistLogged);
            }}
          />
        </Conteudo>
  
        <Rodape>
            <Button onPress={() => handleLogin()}>
              <TextButton >Login</TextButton>
            </Button>
            <Link onPress={() => handleRegister()}>
              <TextLink >Cadastre-se</TextLink>
            </Link>
        </Rodape>
        
      </Container>
    );
};