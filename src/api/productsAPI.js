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
        result= false;
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
        result= false;
    });
    return result;
}

export async function deleteProduct(id) {
    let res;
    let config = {
        method: 'delete',
        url: `${env.REACT_BASE_URL}/product/delete/${id}`
    }
    await axios(config)
    .then(function (response) {
        res = true;
    })
    .catch(function err() {
        res = false;
    });
    return res;
}

export async function updateProduct(product) {
    let res;
    let config = {
        method: 'post',
        url: `${env.REACT_BASE_URL}/product/update`,
        data: product,
    }
    await axios(config)
    .then(function (response) {
        res = true;
    })
    .catch(function err() {
        res = false;
    });
    return res;
}

export async function findProduct(id) {
    let res;
    let config = {
        method: 'get',
        url: `${env.REACT_BASE_URL}/product/one/${id}`,
    }
    await axios(config)
    .then(function (response) {
        res = response.data;
    })
    .catch(function err() {
        res = false;
    });
    return res;
}