import React from 'react';
import { Provider } from 'react-redux';
import DashboardPage from './pages/DashboardPage';

const App = () => (
  <DashboardPage />   // Redux provider can be inside DashboardPage
);

export default App;
