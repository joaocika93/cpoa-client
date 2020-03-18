import React, { useMemo } from 'react';
import Routes from './routes'
import { Provider } from 'react-redux'
import store from './store'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Routes></Routes>
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
