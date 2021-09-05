import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import Colors from './utils/Colors';
import Routes from './routes';

const App = () => {
    const scheme = useColorScheme()

    const light = {
        ...DefaultTheme.colors,
        colors: {
            background: '#FFF',
            backgroundCards: '#FFF',
            text: '#333',
            textHeader: '#FFF',
            placeholder: '#777',
            primary: Colors.primary,
            secundary: Colors.secondary,
            backgroundSearch: '#e1e1e1',
            borderSearch: '#c1c1c1'
        }
    }

    const dark = {
        ...DefaultTheme.colors,
        colors: {
            background: '#333',
            backgroundCards: '#444',
            text: '#d1d1d1',
            textHeader: '#d1d1d1',
            placeholder: '#a1a1a1',
            primary: Colors.primary,
            secundary: Colors.secondary,
            backgroundSearch: '#555',
            borderSearch: '#333'
        }
    }

    return (
        <PaperProvider theme={scheme === 'light' ? light : dark}>
            <Routes />
        </PaperProvider>
    )
}

export default App
