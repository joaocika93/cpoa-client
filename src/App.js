import React from 'react';
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux'
import Store from './store'
function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <HomePage></HomePage>
      </Provider>
    </div>
  );
}

export default App;
