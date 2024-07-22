import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { create } from "zustand";

import axios from "../../api";

interface RequestParams {
    id?: string;
    data?: any;
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
    errorData?: AxiosError | null;
  }
  
  const initialState: RequestState = {
    loading: false,
    success: false,
    error: false,
    data: {},
    errorData: null,
  };
  
  interface StoreState extends RequestState {
    execute: (parameters?: RequestParams) => void;
  }
  
  export const request = ({ method, url }: AxiosRequestConfig, options?: RequestOptions) => {
    return create<StoreState>((set, get) => ({
      ...initialState,
  
      execute: (parameters: RequestParams = {}) => {
        const { id, data, params, force } = parameters;
        set({ ...initialState, loading: true });
       
        // if (!force && method === "GET" && Boolean(get().data)) {
        //   return;
        // }
        
        axios({
          method,
          url: url + (id || ""),
          data,
          params,
        })
          .then((res: AxiosResponse) => {
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
  };
  

  export const useGetProposal = request(
    {
      method: "POST",
      url: '/proposal/get',
    },
  );


  
  export const usPostApplication = request(
    {
      method: "POST",
      url: '/applications',
    },
  );