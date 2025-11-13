import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';
import apiClient, { API_TOKEN_LS_KEY } from './apiClient';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        mutateUser();
    }, []);

    // fungsi untuk refresh data user saat ini
    const mutateUser = useCallback(async () => {
        try {
            const response = await apiClient.get('/user');
            setUser(response.data);
        } catch (error) {
            console.error(error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // fungsi untuk melakukan login
    const login = useCallback(async (email, password) => {
        try {
            const response = await apiClient.post(
                '/login',
                {
                    email,
                    password 
                }
            );
            localStorage.setItem(API_TOKEN_LS_KEY, response.data.token);

            await mutateUser();
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response.data.message };
        }
    }, []);

    // fungsi untuk melakukan logout
    const logout = useCallback(async () => {
        try {
            localStorage.removeItem(API_TOKEN_LS_KEY);
            await mutateUser();
            return { success: true, message: 'Logout berhasil' };
        } catch (error) {
            console.error(error);
            return { success: false, message: error.response.data.message };
        }
    }, []);

    const value = useMemo(() => ({
        user,
        isLoading,
        mutateUser,
        login,
        logout,
    }), [user, isLoading, mutateUser, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

// sebagai custom hook untuk memudahkan pengambilan context
export const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return authContext;
};