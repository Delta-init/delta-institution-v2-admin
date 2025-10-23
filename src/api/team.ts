"use client"
import { TEAM_URL } from "@/constants/api"
import AxiosInstance from "@/utils/axios"

export const getTeam = async (token: string) => {
    const response = await AxiosInstance(token).get(`${TEAM_URL}/`)
    return response.data
}

export const getTeamById = async (token: string, id: string) => {

    const response = await AxiosInstance(token).get(`${TEAM_URL}/${id}`)
    return response.data
}

export const createTeam = async (token: string, data: any) => {
    const formData = new FormData()
    console.log(data)
    formData.append("name", data?.name)
    formData.append("position", data?.position)
    formData.append("image", data?.image)
    formData.append("showingPosition", data?.showingPosition)
    formData.append("isActive", data?.isActive?.toString() || "true")
    const response = await AxiosInstance(token).post(`${TEAM_URL}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}


export const updateTeam = async (token: string, id: string, data: any) => {
    const formData = new FormData()
    formData.append("name", data?.name)
    formData.append("position", data?.position)
    formData.append("image", data?.image)
    formData.append("showingPosition", data?.showingPosition)
    formData.append("isActive", data?.isActive?.toString() || "true")
    const response = await AxiosInstance(token).put(`${TEAM_URL}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}

export const deleteTeam = async (token: string, id: string) => {
    const response = await AxiosInstance(token).delete(`${TEAM_URL}/${id}`)
    return response.data
}




