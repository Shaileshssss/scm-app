import axios from "axios"

export const baseURL = 'http://localhost:8081/'

const client = axios.create({baseURL})

export default client

