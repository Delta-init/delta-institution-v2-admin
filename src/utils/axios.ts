import axios from 'axios';

const AxiosInstance = (token?: string) => {
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_BACKEND_URL, // Replace with your API endpoint,
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data"
        }
        // timeout: 10000
    })
}

export default AxiosInstance;