import axios, { AxiosError } from 'axios';
import { ChangeEvent, useState } from 'react';
import create from 'zustand';

interface DataState {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: any[] | null;
  errorData: string | null;
  execute: (body?: any) => Promise<void>; // Allow an optional body parameter
}

const initialState: Omit<DataState, 'execute'> = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export const useLogIn = create<DataState>((set, get) => ({
  ...initialState,

  execute: async (body?: any) => { 
    console.log("body", body)
    set({ ...initialState, loading: true });
    try {
      const res = await axios.post('auth/login', body);
      set({ ...initialState, success: true, data: res.data });
      localStorage.setItem("tokens", response.data.tokens.access.token);
      localStorage.setItem("refreshToken", response.data.tokens.refresh.token);
      localStorage.setItem("userId", response.data.user.id);
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error in data fetch:', error);
      set({ ...initialState, error: true, errorData: error.response.data });
    }
  },
}));



export const useFormInput = () => {
    const [formValues, setValue] = useState({
        email: "",
        password: ''
    });
  
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {name, value} = event.target;
      setValue({
        ...formValues,
        [name]: value
      });
    };

    return {
      formValues,
      handleChange
    };
  };