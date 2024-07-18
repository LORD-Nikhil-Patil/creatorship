import axios from "../../api/index";
import { create } from "zustand";

// Define the shape of our state
interface State {
  loading: boolean;
  success: boolean;
  error: boolean;
  data: {} | null;
  errorData: string | null;
  execute: (data: any) => Promise<void>;
}

const initialState: Omit<State, 'execute'> = {
  loading: false,
  success: false,
  error: false,
  data: null,
  errorData: null,
};

export const usePostProposal = create<State>((set) => ({
  ...initialState,

  execute: async (data: any) => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.post("proposal", data);
      set({ ...initialState, success: true, data: res.data });
      localStorage.setItem("userProposalId", res.data.id);

    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Error in data fetch:", errorMessage);
      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
}));


export const useGetProposal = create<State>((set) => ({
  ...initialState,

  execute: async (id: any) => {
    set({ ...initialState, loading: true });
    try {
      const res = await axios.post("proposal/get",id)
      console.log("res", res)
      set({ ...initialState, success: true, data: res.data });
    } catch (err: unknown) {
      let errorMessage = 'An unknown error occurred';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      console.error("Error in data fetch:", errorMessage);
      set({ ...initialState, error: true, errorData: errorMessage });
    }
  },
}));