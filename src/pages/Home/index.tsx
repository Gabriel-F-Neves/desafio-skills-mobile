import React, { useContext, useState, useEffect } from "react";
import Api from "../../api/AxiosInstance";
import { FlatList, TouchableOpacity, Alert } from "react-native";
import { Header } from "../../components/Header";
import { StatusBar } from "expo-status-bar";
import { DataContext } from "../../context/DataContext";
import { DadosUserSkillsType } from "../../models/DadosUserSkillsType";
import {  Card, Provider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { AddSkillModal } from "../../components/ModalAddSkill";
import { UpdateLevelModal } from "../../components/ModalUpdateLevel";
import { clearStorage } from "../../services/LocalStorageService";
import { ButtonAdd, CardContent, CardCover, CardDescription, CardLevel, CardLivro, CardTitle, Container, TextAdd } from "./styles";

export function Home({navigation}) {

  const { armazenaDadosUsuario }:any = useContext(DataContext);
  const { dadosUsuario }:any = useContext(DataContext);
  const [userSkills, setUserSkills] = useState<DadosUserSkillsType[]>([]);
  const [logado, setLogado] = useState();
  const [trueOrFalse, setTrueOrFalse] = useState(false);
  const [visibleAddSkill, setVisibleAddSkill] = useState(false);
  const [visibleUpdateSkill, setVisibleUpdateSkill] = useState(false);
  const [skillUpdated, setSkillUpdated] = useState();
  const [userSkillUpdated, setUserSkillUpdated] = useState();

  const Item = ({ item }) => {

    return(
      <CardLivro>
        <CardContent>
          <CardCover source={{uri: item.skill.skillImage}} />
          <CardDescription>{item.skill.skillDescription}</CardDescription>
        </CardContent>
          <CardTitle>{item.skill.skillName} | {item.skill.skillVersion}</CardTitle>
          <CardLevel>Nível: {item.knowledgeLevel}</CardLevel>
        <Card.Actions style={{justifyContent:'center'}}>
          <TouchableOpacity 
            onPress={() => updateSkill(item.skill.skillId, item.userSkillId)}>
              <Ionicons name='menu-outline' size={30} color={'white'}/>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => DeleteSkill(item.userSkillId)}>
              <Ionicons name='remove-circle-outline' size={30} color={'red'}/>
          </TouchableOpacity>
      </Card.Actions>
      </CardLivro>
    )
  };
  
  const updateSkill = (skillId, idUserSkill) => {
    setVisibleUpdateSkill(true);
    setSkillUpdated(skillId);
    setUserSkillUpdated(idUserSkill);
  }

  const DeleteSkill = (id) => {
    Alert.alert(
      "Atenção!",
      "Deseja deletar essa skill da sua lista?",
      [
        {
          text: "Sim",
          onPress: () => {ConfirmDeleteSkill(id)}
        },
        {
          text: "Cancelar",
          onPress: () => {}
        }
      ]
    )
  }
  
  const ConfirmDeleteSkill = async (id) => {
    Api.delete(`/user_skill/${id}`, {
        headers: { "Authorization": `Bearer ${dadosUsuario?.token}` }

    }).then((resp) => {
      Alert.alert(
        "Sucesso!",
        "Skill deletada com sucesso!",
        [
          {
            text: "Ok",
            onPress: () => {}
          }
        ]
      )
        setTrueOrFalse(true)
        console.log("DELETADO COM SUCESSO DO BANCO" + id);

    }).catch((error) => {
        console.log("Erro no DELETE  " + JSON.stringify(error));
    })
}

  const handleSkills = async () => {
    Api.get(`/user/${dadosUsuario.id}`,
        { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }      
    ).then(res => {
        setUserSkills(res.data.user_skills)
        setLogado(res.data)

    }).catch((error) => {
        console.log("Erro ao realizar requisição das skills: " + JSON.stringify(error))
    })
}

const sortedData = userSkills.sort((a, b) => a.userSkillId < b.userSkillId ? -1 : 1);

const renderItem = ({ item }) => {
  return (
    <Item
      item={item}
    />
  );
};

const logoutUser = () => {
  

  Alert.alert(
    "Atenção!",
    "Deseja realmente sair?",
    [
      {
        text: "Sim",
        onPress: () => {confirmLogout()}
      },
      {
        text: "Cancelar",
        onPress: () => {}
      }
    ]
  )
};

const confirmLogout = () => {
  clearStorage();
  navigation.navigate('Login')
};

useEffect(() =>{
  handleSkills();
  setTrueOrFalse(false)
}, [trueOrFalse])


  return (
    <Provider>
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header logout={logoutUser} />
      <ButtonAdd onPress={() => setVisibleAddSkill(true)}>
        <TextAdd>Adicionar Skill</TextAdd>
      </ButtonAdd>

      <AddSkillModal visible={visibleAddSkill} dimiss={() => {setVisibleAddSkill(false), setTrueOrFalse(true)}}/>
      <UpdateLevelModal 
        visible={visibleUpdateSkill} 
        skillId={skillUpdated} 
        idUserSkill={userSkillUpdated}
        dimiss={() => {setVisibleUpdateSkill(false), setTrueOrFalse(true)}}/>
      
      <FlatList
        data={sortedData}
        renderItem={renderItem}
        keyExtractor={(item) => item.userSkillId.toString()}
      />

    </Container>
    </Provider>
  );
}
