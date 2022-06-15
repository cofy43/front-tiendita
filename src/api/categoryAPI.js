import env from "react-dotenv";
const axios = require('axios').default;

export async function getAllCategories() {
    let result;
    let config = {
        method: 'get',
        url: `${env.REACT_BASE_URL}/category/all`,
    }    
    await axios(config)
    .then(function (response) {
        result = response.data;
    })
    .catch(function (error) {
        result= error;
    });
    return result;
}