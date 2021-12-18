import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home/Home';
import Products from './pages/Products/Products'
import Login from './pages/Login/Login';
import AdminHome from './pages/AdminHome/AdminHome';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products/:category" exact component={Products} />
          <Route path="/products/search" exact component={Products} />
          <Route path="/login" exact component={Login} />
          <Route path="/admin-home" exact component={AdminHome} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
