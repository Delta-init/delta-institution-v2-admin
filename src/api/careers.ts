"use client"
import { CAREERS_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getCareers = async (token: string) => {
    const response = await AxiosInstance(token).get(`${CAREERS_URL}/`)
    return response.data
}

export const getCareerById = async (token: string, id: string) => {

    const response = await AxiosInstance(token).get(`${CAREERS_URL}/${id}`)
    return response.data
}

export const createCareer = async (token: string, data: any) => {
    const formData = new FormData()
    console.log(data)
    formData.append("title", data?.title)
    formData.append("position", data?.position)
    formData.append("description", data?.description)
    formData.append("document", data?.document)
    formData.append("location", data?.location)
    formData.append("requirements", data?.requirements)
    formData.append("salaryRange", data?.salaryRange)
    formData.append("isActive", data?.isActive?.toString() || "true")
    const response = await AxiosInstance(token).post(`${CAREERS_URL}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}


export const updateCareer = async (token: string, id: string, data: any) => {
    const formData = new FormData()
    formData.append("title", data?.title)
    formData.append("position", data?.position)
    formData.append("description", data?.description)
    formData.append("document", data?.document)
    formData.append("location", data?.location)
    formData.append("requirements", data?.requirements)
    formData.append("salaryRange", data?.salaryRange)
    formData.append("isActive", data?.isActive?.toString() || "true")
    const response = await AxiosInstance(token).put(`${CAREERS_URL}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export const deleteCareer = async (token: string, id: string) => {
    const response = await AxiosInstance(token).delete(`${CAREERS_URL}/${id}`)
    return response.data
}


export const getApplicationsByCareerId = async (token: string, id: string) => {
    const response = await AxiosInstance(token).get(`${CAREERS_URL}/applications/${id}`)
    return response.data
}




