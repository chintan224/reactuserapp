// import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import UserDetails from './components/UserDetails.js';
import UserList from './components/UserList.js';
import EditUser from './components/EditUser.js';
import UserForm from './components/UserForm.js';
import AppNavBar from './pages/AppNavBar.js';
import HomePage from './pages/HomePage.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
      <AppNavBar/>
      <br/>
      <br/>
      <hr></hr>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/createUser" component={UserForm} />
        <Route path="/userList" component={UserList} />
        <Route path="/edit/:id" component={EditUser} />
        <Route path="/view/:id" component={UserDetails} />
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
