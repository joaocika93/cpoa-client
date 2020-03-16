import axios from 'axios';

const api = axios.create({
    baseURL: 'https://colonial-product-ordering.herokuapp.com/'
});

export default api;