import axios from 'axios';

export default axios.create({
    baseURL: 'https://atackmarketingapi.azurewebsites.net/api/Events'
})