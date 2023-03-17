import React, { useContext, useEffect, useState } from "react";
import { Alert } from 'react-native';
import { Modal, Portal, List } from "react-native-paper";
import {Picker} from '@react-native-picker/picker'
import Api from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";
import { DadosSkillType } from "../../models/DadosSkillType";
import { ButtonAdd, TextAdd } from "./styles";

export function AddSkillModal({visible, dimiss}){

    const level = [
        {id: 1, value:'Um'},
        {id: 2, value:'Dois'},
        {id: 3, value:'Três'},
        {id: 4, value:'Quatro'},
        {id: 5, value:'Cinco'},
        {id: 6, value:'Seis'},
        {id: 7, value:'Sete'},
        {id: 8, value:'Oito'},
        {id: 9, value:'Nove'},
        {id: 10, value:'Dez'},
    ]

    const { dadosUsuario }:any = useContext(DataContext)
    const [allSkills, setAllSkills] = useState<DadosSkillType[]>([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [ selectedLevel, setSelectedLevel] = useState(null);

    const containerStyle:any = {
        backgroundColor: 'white', 
        borderRadius: 10,
        padding: 20, 
        height:400, 
        width:350,
        alignSelf: 'center',
    };

    const getCurrentDate = () => {
        const date = new Date().toJSON().slice(0, 10);
        return date;
      };

    const handleAllSkills = async () => {
        Api.get(`/skill`,
            { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } }
        ).then((res) => {
            setAllSkills(res.data)
        }).catch((error) => {
            console.log("Erro ao realizar requisição das skills: " + JSON.stringify(error))
        })
    }

    const handleSaveUserSkill = async () => {
        try {
            await Api.post('/user_skill',
                {
                    user: {
                        userId: dadosUsuario.id
                    },
                    skill: {
                        skillId: selectedSkill
                    },
                    knowledgeLevel: selectedLevel,

                    createdAt: getCurrentDate(),
                },
                { headers: { "Authorization": `Bearer ${dadosUsuario?.token}` } })
                Alert.alert(
                    "Sucesso!",
                    "Skill adicionada com sucesso!",
                    [
                      {
                        text: "Ok",
                        onPress: () => {}
                      }
                    ]
                  )
        } catch (error) {
            Alert.alert(
                "Atenção!",
                "Aconteceu um erro ao adicionar esta skill!",
                [
                  {
                    text: "Ok",
                    onPress: () => {}
                  }
                ]
              )
        }
    }
    
    const onSkillChange = (itemValue, itemIndex) => {
        setSelectedSkill(itemValue);
    };

    const onLevelChange = (itemValue, itemIndex) => {
        setSelectedLevel(itemValue);
    };

    useEffect(() => {
        handleAllSkills();
    },[])

    return(
        <Portal>
            <Modal 
                visible={visible} onDismiss={() => dimiss(true)} 
                contentContainerStyle={containerStyle}
            >
                <Picker
                    selectedValue={selectedSkill}
                    onValueChange={onSkillChange}
                >
                    <Picker.Item label="Selecione uma habilidade" value={null} />
                        {allSkills.map(skill => (
                    <Picker.Item
                        key={skill.skillId}
                        label={skill.skillName}
                        value={skill.skillId}
                    />
                    ))}
                </Picker>
                <Picker
                    selectedValue={selectedLevel}
                    onValueChange={onLevelChange}
                >
                    <Picker.Item label="Selecione o nível" value={null} />
                        {level.map(resLevel => (
                    <Picker.Item
                        key={resLevel.id}
                        label={resLevel.value}
                        value={resLevel.id}
                    />
                    ))}
                </Picker>
                <ButtonAdd onPress={() => { handleSaveUserSkill() }}>
                    <TextAdd>Salvar Skill</TextAdd>
                </ButtonAdd>
            </Modal>
        </Portal>
      
    )
} 