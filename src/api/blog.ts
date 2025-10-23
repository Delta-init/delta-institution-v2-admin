"use client"
import { BLOG_URL } from "@/constants/api"
import { initialBlogPosts } from "@/constants/data";
import AxiosInstance from "@/utils/axios"

export const getBlogs = async (token: string) => {
    const response = await AxiosInstance(token).get(`${BLOG_URL}/`)
    return response.data
}

export const getBlogById = async (token: string, id: string) => {

    const response = await AxiosInstance(token).get(`${BLOG_URL}/${id}`)
    return response.data
}

export const createBlog = async (token: string, data: any) => {
    const formData = new FormData()
    console.log(data)
    formData.append("title", data?.title)
    formData.append("content", data?.content as string)
    formData.append("description", data?.description)
    formData.append("image", data?.image)
    formData.append("tags", data?.tags)
    formData.append("category", data?.category)
    const response = await AxiosInstance(token).post(`${BLOG_URL}/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}


export const updateBlog = async (token: string, id: string, data: any) => {
    const formData = new FormData()
    formData.append("title", data?.title)
    formData.append("content", data?.content)
    formData.append("description", data?.description)
    formData.append("image", data?.image)
    formData.append("tags", data?.tags)
    formData.append("category", data?.category)
    const response = await AxiosInstance(token).put(`${BLOG_URL}/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}






