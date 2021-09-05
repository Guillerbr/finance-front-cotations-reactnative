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
            text: '#333',
            textHeader: '#FFF',
            backgroundSearch: '#d1d1d1',
            placeholder: '#777',
            primary: Colors.primary,
            secundary: Colors.secondary
        }
    }

    const dark = {
        ...DefaultTheme.colors,
        colors: {
            background: '#333',
            text: '#fff',
            textHeader: '#d1d1d1',
            placeholder: '#a1a1a1',
            backgroundSearch: '#555',
            primary: Colors.primary,
            secundary: Colors.secondary
        }
    }

    return (
        <PaperProvider theme={scheme === 'light' ? light : dark}>
            <Routes />
        </PaperProvider>
    )
}

export default App
