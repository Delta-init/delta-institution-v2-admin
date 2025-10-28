import axios from 'axios';

const AxiosInstance = (token?: string, headers?: any) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your API endpoint,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers
        }
        // timeout: 10000
    })
}

export default AxiosInstance;