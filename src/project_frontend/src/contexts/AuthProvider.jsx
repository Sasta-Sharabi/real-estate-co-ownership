import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthClient } from '@dfinity/auth-client'
import { HttpAgent } from '@dfinity/agent'
import { createActor, canisterId } from '../../../declarations/project_backend';

const AuthContext = createContext();

// Use your actual environment variables
const network = process.env.DFX_NETWORK || 'local';
const isLocal = network === 'local';

const defaultOptions = {
    createOptions: {
        idleOptions: {
            disableIdle: true,
        }
    },
    loginOptions: {
        // Use your actual Internet Identity canister ID
        identityProvider: isLocal 
            ? `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943/`
            : "https://identity.ic0.app",
        maxTimeToLive: BigInt(7) * BigInt(24) * BigInt(3_600_000_000_000), // 1 week
    }
}

export const useAuthClient = (options = defaultOptions) => {
    const [isAuth, setIsAuth] = useState(false);
    const [authUser, setAuthUser] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [principal, setPrincipal] = useState(null);
    const [callFunction, setCallFunction] = useState(null);

    useEffect(() => {
        AuthClient.create(options.createOptions).then(async (client) => {
            updateClient(client);
        });
    }, []);

    async function updateClient(client) {
        const isAuthenticated = await client.isAuthenticated();
        setIsAuth(isAuthenticated);

        const identity = client.getIdentity();
        setIdentity(identity);

        const principal = identity.getPrincipal();
        setPrincipal(principal);

        setAuthUser(client);

        // Create agent with proper configuration
        const agent = new HttpAgent({
            host: isLocal ? 'http://localhost:4943' : 'https://ic0.app',
            identity,
        });

        // Fetch root key for local development only - THIS IS CRITICAL
        if (isLocal) {
            try {
                await agent.fetchRootKey();
                console.log('Root key fetched successfully');
            } catch (error) {
                console.error('Failed to fetch root key:', error);
                // Don't throw here, continue with limited functionality
            }
        }

        // Create actor with the configured agent
        const actor = createActor(canisterId, {
            agent,
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
                console.log('Login successful');
                updateClient(authUser);
            },
            onError: (error) => {
                console.error('Login failed:', error);
            }
        });
    };

    async function logout() {
        try {
            await authUser?.logout();
            console.log('Logout successful');
            await updateClient(authUser);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return {
        isAuth,
        login,
        logout,
        authUser,
        identity,
        principal,
        callFunction,
    }
}

export const AuthProvider = ({ children }) => {
    const auth = useAuthClient();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
