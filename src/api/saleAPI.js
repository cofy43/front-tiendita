import env from "react-dotenv";
const axios = require('axios').default;

export async function getAllSales() {
    let result;
    let config = {
        method: 'get',
        url: `${env.REACT_BASE_URL}/sale/all`,
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

export async function createASale(newSale) {
    let result;
    let config = {
        method: 'post',
        url: `${env.REACT_BASE_URL}/sale/add`,
        data: newSale,
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

export async function updateSale(updatedSale) {
    let result;
    let config = {
        method: 'post',
        url: `${env.REACT_BASE_URL}/sale/update`,
        data: updatedSale,
    }    
    await axios(config)
    .then(function (response) {        
        result = response.status;
    })
    .catch(function (error) {
        result= false;
    });
    return result;
}

export async function findOne(saleId) {
    let result;
    let config = {
        method: 'get',
        url: `${env.REACT_BASE_URL}/sale/one/${saleId}`,        
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

