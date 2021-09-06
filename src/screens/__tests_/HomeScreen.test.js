import React from 'react';
import HomeScreen from '../HomeScreen';
import { fireEvent, render } from '@testing-library/react-native';

describe('HomeScreen', () => {

    it('should go to finance screen on login', () => {
        const screen = render(<HomeScreen />)

        const loginButton = screen.getByTestId('loginButton')

        fireEvent.press(loginButton)
    })
})