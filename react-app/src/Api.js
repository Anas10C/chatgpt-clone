
import axios from 'axios'

const backendUrl = process.env.REACT_APP_GPT_URL
const protocol  = process.env.REACT_APP_GPT_PROTOCOL;
const fullBackendUrl = `${protocol}://${backendUrl}/topics`;

const client = axios.create({
    baseURL: fullBackendUrl
});

export default client;