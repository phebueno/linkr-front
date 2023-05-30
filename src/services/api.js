import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function createConfig(token) {
    return { headers: { Authorization: `Bearer ${token}` } };
}

//Criar as requisições HTTP para o nosso back


const api = {

}

export default api;