import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Weather from './components/pages/Weather/Weather';


function App() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={Weather} />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
