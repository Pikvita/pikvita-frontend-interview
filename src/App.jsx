import './index.css';
import React from 'react';
import { Provider } from 'react-redux'
import Quiz from './components/othercomp/Quiz'
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Quiz />
      </div>
    </Provider>
  );
};

export default App;