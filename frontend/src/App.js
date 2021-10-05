import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route
            path={route.path}
            exact
            component={(props) =>
              route.component({
                ...props,
                title: route.title,
                path: route.path,
              })
            }
            key={index}
          />
        ))}
      </Switch>
    </Router>
  );
};

export default App;
