import React from 'react';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddReview from './components/add-reviews';
import Restaurant from './components/restaurant';
import RestaurantsList from './components/restaurants-list';
import Login from './components/login';

function App() {
  const [user,setUser]=React.useState({id:"12346"});
  async function login(user=null){
    setUser(user);
  }
  async function logout(){
    setUser(null);
  }
  
  return (
    <Router>
    <div>
      
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">
          Restaurant Reviews
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            {
              user ? (
                <span onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                  Logout {user.name}
                </span>
              ) :(
                <Link to={"login"} className="nav-link">
                  Login
                </Link>
              )
            }
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"restaurants"} element={<RestaurantsList/>}/>
          <Route exact path={""} element={<RestaurantsList/>}/>

          <Route path="restaurants/:id/review" element={ <AddReview user={user}/> }/>
          <Route path="restaurants/:id" element={<Restaurant user={user}/>}/>
          <Route path="login" element={<Login user={user}/>}/>
  
            
        </Routes>
      </div>
      
    </div>
    </Router>
  );
}

export default App;
