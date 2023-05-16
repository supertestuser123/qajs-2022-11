import { getToken, getAuth, getUserInfo, getUserInfoWrongID, deleteUser } from './helper.js';
import config from './config.js';
import { expect } from '@jest/globals';

describe('New API Tests', () => {
  test('Авторизация с валидным токеном', async () => {
    const response = await getAuth({ username: config.user.userName, password: config.user.password })
    
    expect(response).toBe(true)
  });

  test('Отсутствие токена если пользователь не найлен', async () => {
    const token = await getToken({ username: 'invalid_token', password: 'invalid_pass' })
    
    expect(token).toBe(null)
  });

  test('Удаление пользователя - Успешно', async () => {
    const token = await getToken({ username: config.deleteUser.userName, password: config.deleteUser.password })
    const response = await deleteUser(token)
    
    expect(response.status).toBe(200)
    expect(response.statusText).toBe('OK')
  });

  test('Удаление пользователя - Негативно', async () => {
    const token = await getToken({ username: '123', password: config.deleteUser.password })
    const response = await deleteUser(token)
    
    expect(token).toBe(null) //сам юзер удаляется если проверить getUserInfo
  });

  test('Получение информации о пользователе', async () => {
    //config.user.username и password на config.delete.username и password для проверки удаления
    const token = await getToken({ username: config.user.userName, password: config.user.password })
    const response = await getUserInfo(token)
   
    expect(response.username).toBe(config.user.userName)
    expect(response.userId).toBe(config.testUserID)
    expect(response).toHaveProperty('books')  
  });

  test('Получение информации о пользователе c невалидным токенном (ошибка авторизации)', async () => {
    const token = await getToken({ username: 'heh', password: config.user.password })
    const response = await getUserInfo(token)
   
    expect(response.code).toBe('1200')
    expect(response.message).toBe('User not authorized!')
 });

 test('Получение информации о пользователе c (ошибка авторизации)', async () => {
  const token = await getToken({ username: config.user.userName, password: config.user.password })
  const response = await getUserInfoWrongID(token)
  
  expect(response.code).toBe('1207')
  expect(response.message).toBe('User not found!')
});

});