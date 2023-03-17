import React, { createContext, useState } from "react";
import { DadosUsuarioType } from '../models/DadosUsuarioType';
import jwt_decode from "jwt-decode";

export const DataContext = createContext({});

export const DataProvider = ({children}) => {
    const [dadosUsuario, setDadosUsuario] = useState<DadosUsuarioType>();
    
    const armazenaDadosUsuario = (jwt:any) => {
        
        var tokenDecodificado:any = jwt_decode(jwt);

        //Armazenando apenas a chave usuario da string json decodificada
        var usuario = tokenDecodificado.usuario;
        
        //Transformando a string json contida dentro da variavel usuario num objeto javascript
        usuario = JSON.parse(usuario);

        setDadosUsuario({
            id: usuario?.userId,
            login: usuario?.userLogin,
            token: jwt
        });
    }
    return(
        <DataContext.Provider value={{
            dadosUsuario,
            armazenaDadosUsuario
        }}>
            {children}
        </DataContext.Provider>
    );
}