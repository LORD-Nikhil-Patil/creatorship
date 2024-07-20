import { useState, useCallback, ChangeEvent } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from "../../api";
import { create } from "zustand";

export interface User {
    name?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    username?: string;
    about?: string;
    photo?: string;
    coverPhoto?: string;
    isEmailVerified: boolean;
    role?: string;
    id?: string; 
}

interface RequestParams {
    id?: string;
    data?: User;
    params?: any;
    force?: boolean;
    onSuccess?: (res: AxiosResponse) => void;
    onError?: (err: AxiosError) => void;
    onFinal?: () => void;
}

interface RequestOptions {
    onSuccess?: (res: AxiosResponse) => void;
    onError?: (err: AxiosError) => void;
    onFinal?: () => void;
}

interface RequestState {
    loading: boolean;
    success: boolean;
    error: boolean;
    data?: any;
    errorData?: AxiosError;
}

const initialState: RequestState = {
    loading: false,
    success: false,
    error: false,
};

export const request = ({ method, url }: AxiosRequestConfig, options?: RequestOptions) =>
    create((set, get:any) => ({
      ...initialState,
      execute: (parameters: RequestParams = {}) => {
        const { id, data, params, force } = parameters;
        set({ ...initialState, loading: true });
  
        if (!force && method === "GET" && Boolean(get().data)) {
          return;
        }
  
        axios({
          method,
          url: url + (id || ""),
          data,
          params,
        })
        .then((res) => {
          set({ ...initialState, success: true, data: res.data });
          options?.onSuccess?.(res);
          parameters?.onSuccess?.(res);
        })
        .catch((err: AxiosError) => {
          set({ ...initialState, error: true, errorData: err });
          options?.onError?.(err);
          parameters?.onError?.(err);
        })
        .finally(() => {
          options?.onFinal?.();
          parameters?.onFinal?.();
        });
      },
    }));

export const useGetUser = request(
    {
      method: "GET",
      url: 'users/',
    },
  );

  export const useUpdateUser: any = request(
    {
      method: "PATCH",
      url: 'users/',
    },
  );
const initialUserState: User = {
    name: "",
    email: "",
    isEmailVerified: false,
    first_name: "",
    last_name: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    username: "",
    about: "",
    photo: "",
    coverPhoto: ""
};

export const useUser = (data: any, close: Function) => {
    const [user, setUser] = useState<User>(data);
    const updateUser = useUpdateUser();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = event.target;
        if(name === "photo" || name === "file-upload"){
            setUser(prevUser => ({
                ...prevUser,
                [name]: files[0],
            }));
            return
        }
        setUser(prevUser => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const {role, isEmailVerified, id, ...data} = user
        let params = {
            id: id,
            data: data
        }
        updateUser.execute(params)
        close(false)
    };

    const resetUser = useCallback(() => {
        setUser(initialUserState);
        close(false)
    }, [initialUserState]);

    return {
        user,
        handleChange,
        handleSubmit,
        resetUser
    };
};

