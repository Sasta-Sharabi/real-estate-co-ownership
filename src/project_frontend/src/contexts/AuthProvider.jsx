import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import {createActor , canisterId} from '../../../declarations/project_backend';

const AuthContext = createContext();

const defaultOptions = {
    createOptions:{
        idleOptions:{
            disableIdle : true,
        }
    },
    loginOptions:{
        identityProvider: "http://uxrrr-q7777-77774-qaaaq-cai.localhost:4943/",
    }
}

export const useAuthClient = (options = defaultOptions) => {
    const [isAuth , setIsAuth] = useState(false);
    const [authUser , setAuthUser] = useState(null);
    const [identity , setIdentity] = useState(null);
    const [principal , setPrincipal] = useState(null);
    const [callFunction, setCallFunction] = useState(null);

    useEffect(()=>{

        AuthClient.create(options.createOptions).then(async (client)=>{
            updateClient(client);
        });

    },[]);

    async function updateClient(client){
        const isAuthenticated = await client.isAuthenticated();
        setIsAuth(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthUser(client);

        const actor = createActor(canisterId , {
            agentOptions: {
                identity,
            },
        });

        setCallFunction(actor);
    }

    const login = () => {
        if (!authUser) {
            console.warn("authUser is not ready yet");
            return;
        }

        authUser.login({
            ...options.loginOptions,
            onSuccess: () => {
            updateClient(authUser);
            },
        });
    };


    async function logout(){
        await authUser?. logout();
        await updateClient(authUser);
    }

    return  {
        isAuth,
        login,
        logout,
        authUser,
        identity,
        principal,
        callFunction,
    }
}

export const AuthProvider = ({children}) => {
    const auth = useAuthClient();


  return (
    <AuthContext.Provider value= {auth}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);