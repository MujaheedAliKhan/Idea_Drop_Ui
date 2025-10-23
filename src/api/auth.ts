//Creating a mutuation Function
//This function have to use in routes/register.index.tsx

import api from "@/lib/axios";

//This is for registerUser created by mutuation func
export const registerUser = async ({
    name, 
    email,
    password
}: {
    name: string,
    email: string,
    password : string
}) => {
    try {
        const res = await api.post('/auth/register', {
            name, email, password
        })
        return res.data;
    } catch (err:any) {
        const message = err.response?.data?.message || alert('Failed to Register');
        throw new Error (message);
    }
}


//Creating Mutation Func for Login

export const loginUser =  async (credentials: {
    email: string,
    password : string,
} ) => {
    try {
        const res = await api.post('/auth/login', credentials);
        return res.data;
    } catch (err: any) {
        const message = err.response?.data?.message || alert('Failed to Login');
        throw new Error (message);
    }
}

//Creating a Mutation Function for Logout User

export const logoutUser = async () => {
    try {
        await api.post('/auth/logout');
    } catch (err:any) {
        const message = err.response?.data?.message || alert('Failed to Logout');
        throw new Error (message);
    }
}

//Creating Mutation function for refresh token when the page refresh
export const refreshAccessToken = async () =>{
    try {
        // use raw axios to avoid hitting interceptors of `api`
        const res = await api.post('/auth/refresh');
        return res.data;
    } catch (err:any) {
        const message = err.response?.data?.message || 'Failed to refresh access token';
        throw new Error(message);
    }
}