import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';
import { AuthProvider } from './context/auth';
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
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
    </AuthProvider>
  );
};

export default App;
