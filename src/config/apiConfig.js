import axios from "axios"

export const API_BASE_URL = "http://69.62.82.138:5454"

const jwt = sessionStorage.getItem("jwt")

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": "application/json"
    }
})