import axios from "axios"

export const API_BASE_URL = "https://narivastaram.com"

const jwt = sessionStorage.getItem("jwt")

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
    }
})