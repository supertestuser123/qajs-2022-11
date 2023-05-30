import { getListObjectsByIds, editObjectNoBody, editObjectNotFound, editObjectWrongURL, editObject, getAllObjectsInfo,getSingleObjectsInfo, addObject } from './helper.js';
import config from './config.js';
import { expect } from '@jest/globals';

describe('Homework 8 API Tests', () => {
    test('1 - Получение весь список объектов', async () => {
        const response = await getAllObjectsInfo();
        
        expect(typeof response).toBe('object')
    });

    test('2 - Получение определенный объект', async () => {
        const response = await getSingleObjectsInfo(5);
        
        expect(response).toHaveProperty('id')
        expect(response).toHaveProperty('name')
        expect(response).toHaveProperty('data')
     
    });

    test.skip('3 - Получение несуществующего объека', async () => {
        const id = 999
        const response = await getSingleObjectsInfo(id);
        
        expect(response.error).toBe('Oject with id='+id+' was not found.')
    });

    test.skip('4 - Добавление данных', async () => {
        const deviceName = 'Super iPhone 2023'
        const response = await addObject(deviceName);
        
        expect(response).toHaveProperty('createdAt')
        expect(response.name).toBe(deviceName)
        expect(response).toHaveProperty('id')

    });

    test.skip('5 - Обновление данных', async () => {
        const inputName= 'Super Samsung 2024'
        const response = await editObject(inputName);
        
        expect(response.name).toBe(inputName)
        expect(response).toHaveProperty('updatedAt')
    });

    test.skip('6 - Обновление данных c ошибочным URL', async () => {
        const inputName= 'Super Samsung 2024'
        const response = await editObjectWrongURL(inputName);
        
        expect(response.status).toBe(405)
        expect(response.error).toBe('Method Not Allowed')
        expect(response.path).toBe('/objects')
        expect(response).toHaveProperty('timestamp')
    });

    test.skip('7 - Обновление данных не найденным ID', async () => {
        const wrongID = 9999
        const response = await editObjectNotFound(wrongID);
        
        expect(response).toHaveProperty('error')
        expect(response.error).toBe("The Object with id = "+ wrongID + " doesn't exist. Please provide an object id which exists or generate a new Object using POST request and capture the id of it to use it as part of PATCH request after that.")
    });
    
    test.skip('8 - Обновление данных без тела запроса', async () => {
        const response = await editObjectNoBody();
        
        expect(response).toHaveProperty('error')
        expect(response.error).toBe('400 Bad Request. If you are trying to create or update the data, potential issue is that you are sending incorrect body json or it is missing at all.')
    });

    test.skip('9 - Получение списка нескольких объектов', async () => {
        const response = await getListObjectsByIds([1,2,3])
        console.log(response);
        response.forEach((data) => {
            expect(data.id).toEqual(expect.any(String));
          });

          expect(response[0].id).toBe('1');
          expect(response[1].id).toBe('2');
          expect(response[2].id).toBe('3');
    })

    // test.each([
    //     [7, "Apple MacBook Pro 16"],
    //   ])('10 - Параметризированный тест', async (id, name) => {
    //     const result = await getSingleObjectsInfo(7);
    //     expect(result).toMatchObject({id: id.toString(), name: name});
    //   });

})