import React from 'react';
import { Container, Logo, LogoutButton } from './styles'
import logoImg from '../../assets/logoneki-semfundo.png'
import { Ionicons } from "@expo/vector-icons";

export function Header({ logout }){
      
    return(
        <Container>
            <Logo source={logoImg}/>
            <LogoutButton onPress={logout}>
                <Ionicons name='log-out-outline' size={40} color='white'/>
            </LogoutButton>
        </Container>
    )
}