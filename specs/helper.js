import config, { deviceName } from './config.js';

const getToken = async ({ username, password }) => {
  const response = await fetch(`${config.baseUrl}/Account/v1/GenerateToken`, {
     method: 'POST',
     body: JSON.stringify({userName: username, password}),
     headers: { 'Content-Type': 'application/json' },
 })
  const data = await response.json();
  return data.token
};

const getAuth = async ({ username, password }) => {
  const response = await fetch(`${config.baseUrl}/Account/v1/Authorized`, {
      method: 'POST',
      body: JSON.stringify({userName: username, password}),
      headers: { 'Content-Type': 'application/json' },
      });
    const data = await response.json();
    return data
 };

 const getUserInfo = async (token) => {
  //config.testUserID поменять на config.userForDeleteID - для проверки удаленного пользователя
  const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.testUserID}`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}`
       },
   });
  
    const data = await response.json();
    return data
 };

 const getUserInfoWrongID = async (token) => {
  const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.wrongTestID}`, {
      method: 'GET',
      headers: { 
        Authorization: `Bearer ${token}`
       },
   });
    const data = await response.json();
    return data
 };

 const deleteUser = async (token) => {
  const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.userForDeleteID}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
       },
    });
   
  return response 
};

const getAllObjectsInfo = async () => {
  const response = await fetch(`${config.baseUrl}`, {
      method: 'GET',
            
    });
   
    const data = await response.json();
    return data
};

const getSingleObjectsInfo = async (id) => {
  const response = await fetch(`${config.baseUrl}/${id}`, {
      method: 'GET',
            
    });
   
    const data = await response.json();
    return data
};

const addObject = async(name) => {
  const response = await fetch(`${config.baseUrl}`, {
    method: 'POST',
    body: JSON.stringify({ deviceName: name }),
    headers: { 'Content-Type': 'application/json' },
    });
  const data = await response.json();
  return data
}

const editObject = async(name) => {
  const response = await fetch(`${config.baseUrl}/${config.idForUpdate}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: name }),
    headers: { 'Content-Type': 'application/json' },
    });
  const data = await response.json();
  return data
}

const editObjectWrongURL = async(name) => {
  const response = await fetch(`${config.baseUrl}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: name }),
    headers: { 'Content-Type': 'application/json' },
    });
  const data = await response.json();
  return data
}

const editObjectNotFound = async(name) => {
  const response = await fetch(`${config.baseUrl}/${config.wrongID}`, {
    method: 'PATCH',
    body: JSON.stringify({ name: name }),
    headers: { 'Content-Type': 'application/json' },
    });
  const data = await response.json();
  return data
}

const editObjectNoBody = async() => {
  const response = await fetch(`${config.baseUrl}/${config.idForUpdate}`, {
    method: 'PATCH',
    
    headers: { 'Content-Type': 'application/json' },
    });
  const data = await response.json();
  return data
}

const getListObjectsByIds = async() => {
  const response = await fetch(`${config.baseUrl}?id=${config.id1}&id=${config.id2}&id=${config.wrongID}`, {
    method: 'GET',
  });
  const data = await response.json();
  return data
}



module.exports = {
  getListObjectsByIds, editObjectNoBody, editObjectNotFound, editObjectWrongURL, editObject, addObject, getToken, getAuth, getUserInfo, getUserInfoWrongID, deleteUser,getAllObjectsInfo,getSingleObjectsInfo
};