import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import Robot from '../src/statics/images/robot.png'
import Todo from './models/todolist'


const App: React.FC = () => {

  const Page404 = () => {
    return <div style={{ backgroundColor: '#fff' }}>
      <h3 style={{ color: '#000' }}>你进入了荒漠 404</h3>
      <img src={Robot} alt="robot" />
    </div>
  }

  const renderRoutes = () => {
    return (
      <Switch>
        <Route path="/todo" component={Todo} />
        <Route component={Page404} />
      </Switch>
    );
  }


  return (
    <Fragment>
      {renderRoutes()}
    </Fragment>
  );
}

export default App;
