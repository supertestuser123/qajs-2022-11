import config from './config.js';

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


module.exports = {
  getToken, getAuth, getUserInfo, getUserInfoWrongID, deleteUser
};