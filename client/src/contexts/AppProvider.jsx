import React, { createContext, useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AppContext = createContext();

function AppProvider({ children }) {
    const [user, setUser] = useState(null);
    const [searchKeys, setSearchKeys] = useState('');
    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost:5000';
    axios.defaults.withCredentials = true;


    // Auth APIs
    const register = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/register', formData);
            setUser(data);
            toast.success('Registered successfully');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    };

    const login = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/login', formData);
            setUser(data);
            toast.success('Logged in successfully');
            navigate('/');
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            setUser(null);
            toast.success('Logged out');
            navigate('/login');
        } catch (err) {
            toast.error('Logout failed');
        }
    };


    // Transaction APIs
    const addTransaction = async (transaction) => {
        try {
            await axios.post('/api/transactions', transaction);
            toast.success('Transaction added');
        } catch (err) {
            toast.error('Add transaction failed');
        }
    };

    const getTransactions = async () => {
        try {
            const { data } = await axios.get('/api/transactions');
            return data;
        } catch (err) {
            toast.error('Fetch transactions failed');
            return [];
        }
    };

    const updateTransaction = async (id, updates) => {
        try {
            await axios.put(`/api/transactions/${id}`, updates);
            toast.success('Transaction updated');
        } catch (err) {
            toast.error('Update transaction failed');
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`);
            toast.success('Transaction deleted');
        } catch (err) {
            toast.error('Delete transaction failed');
        }
    };

    // Budget APIs
    const addBudget = async (budget) => {
        try {
            await axios.post('/api/budgets', budget);
            toast.success('Budget added');
        } catch (err) {
            toast.error('Add budget failed');
        }
    };

    const getBudgets = async () => {
        try {
            const { data } = await axios.get('/api/budgets');
            return data;
        } catch (err) {
            toast.error('Fetch budgets failed');
            return [];
        }
    };

    const updateBudget = async (id, updates) => {
        try {
            await axios.put(`/api/budgets/${id}`, updates);
            toast.success('Budget updated');
        } catch (err) {
            toast.error('Update budget failed');
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`/api/budgets/${id}`);
            toast.success('Budget deleted');
        } catch (err) {
            toast.error('Delete budget failed');
        }
    };

    const loadUser = async () => {
        try {
            const res = await axios.get('/api/auth/me');
            setUser(res.data);
            navigate('/');
        } catch (err) {
            setUser(null);
            navigate('/login')
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <AppContext.Provider
            value={{
                user,
                navigate,
                setUser,
                searchKeys,
                setSearchKeys,
                register,
                login,
                logout,
                addTransaction,
                getTransactions,
                updateTransaction,
                deleteTransaction,
                addBudget,
                getBudgets,
                updateBudget,
                deleteBudget,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
export const useAppContext = () => useContext(AppContext);
