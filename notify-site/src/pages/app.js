import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRouter/PrivateRouter';
import FireDepartment from '../components/FireDepartment/FireDepartment';
import Login from '../components/Login/Login';
import EditDep from '../components/FireDepartment/EditDepartment';
import MainTemplate from '../templates/MainTemplate/MainTemplate';
import ManageDepartment from '../components/FireDepartment/ManageDepartment';
import AddFireFighter from '../components/FireFighter/AddFireFighter';
import SendNotify from '../components/Notify/SendNotify';
import SentTo from '../components/Notify/SentTo';

const App = () => (
  <MainTemplate>
    <Router>
      <PrivateRoute path="/app/straz" component={FireDepartment} />
      <PrivateRoute path="/app/straz/edit/:departmentId" component={EditDep} />
      <PrivateRoute
        path="/app/straz/edit/:departmentId/firefighters"
        component={ManageDepartment}
      />
      <PrivateRoute
        path="/app/straz/edit/:departmentId/firefighters/addfirefighter"
        component={AddFireFighter}
      />
      <PrivateRoute path="/app/notify" component={SendNotify} />
      <PrivateRoute
        path="/app/notify/sentto/:departmentId"
        component={SentTo}
      />

      <Login path="/app/login" />
    </Router>
  </MainTemplate>
);

export default App;
