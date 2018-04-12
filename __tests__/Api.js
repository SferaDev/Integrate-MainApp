import 'react-native';
import React from 'react';
import api from '../__mocks__/api';


it('login() is callable and returns nothing', () => {
    api.login('12334', '1234').then((s) => {
        expect(typeof s).toBe('string');
    });
});
