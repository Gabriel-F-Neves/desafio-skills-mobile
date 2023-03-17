import React, { useContext, useState } from "react";
import { Alert } from 'react-native';
import { Modal, Portal } from "react-native-paper";
import {Picker} from '@react-native-picker/picker'
import { ButtonAdd, TextAdd } from "./styles";
import Api from "../../api/AxiosInstance";
import { DataContext } from "../../context/DataContext";

export function UpdateLevelModal ({visible, dimiss, skillId, idUserSkill}){

    const { dadosUsuario }:any = useContext(DataContext);
    const [selectedLevel, setSelectedLevel] = useState(null);

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

    const containerStyle:any = {
        backgroundColor: 'white', 
        borderRadius: 10,
        padding: 20, 
        height:300, 
        width:350,
        alignSelf: 'center',
    };

    const getCurrentDate = () => {
        const date = new Date().toJSON().slice(0, 10);
        return date;
      };

    const onSkillChange = (levelValue) => {
        setSelectedLevel(levelValue);
    };

    const handleUpdateLevel = async (idUserSkill, idSkill) => {
         try {
            await Api.put(
                `/user_skill/${idUserSkill}`,
                {
                    user: {
                        userId: dadosUsuario.id
                    },
                    skill: {
                        skillId: idSkill
                    },
                    knowledgeLevel: selectedLevel,

                    updatedAt: getCurrentDate(),
                },
                { headers: { Authorization: `Bearer ${dadosUsuario?.token}` } },
            ).then((resp) => {
                Alert.alert(
                    "Sucesso!",
                    "Nível alterado com sucesso!",
                    [
                      {
                        text: "Ok",
                        onPress: () => {}
                      }
                    ]
                  )
                console.log("O seu nível foi alterado com sucesso.");
            });
        } catch (error) {
            console.log("Algo deu errado, tente novamente.");
        }
    };

    return(
        <Portal>
            <Modal
                visible={visible} onDismiss={() => dimiss(true)} 
                contentContainerStyle={containerStyle}
            >
                <Picker
                    selectedValue={selectedLevel}
                    onValueChange={onSkillChange}
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
                <ButtonAdd onPress={() => { handleUpdateLevel(idUserSkill, skillId) }}>
                    <TextAdd>Atualizar Nível</TextAdd>
                </ButtonAdd>
            </Modal>
        </Portal>
    )
};