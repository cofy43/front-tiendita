import env from "react-dotenv";
const axios = require('axios').default;

export async function getAllProducts() {
    let result;
    let config = {
        method: 'get',
        url: `${env.REACT_BASE_URL}/product/all`,
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

export async function createAProduct(product) {
    let result;
    let config = {
        method: 'post',
        url: `${env.REACT_BASE_URL}/product/add`,
        data: product,
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