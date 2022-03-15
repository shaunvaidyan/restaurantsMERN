import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/AddReview";
import Login from "./components/Login";
import Restaurant from "./components/Restaurants";
import RestaurantsList from "./components/RestaurantsList";

function App() {
  const [user, setUser] = React.useState(null); // creates state variable in our react app w/ initial value of null

  async function login(user = null){  // calls login function and sets user --Placeholder Login for real login system--
    setUser(user);
  }

  async function logout(){
    setUser(null)
  }


  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/restaurants" className="navbar-brand">Restaurant Reviews</a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/restaurants"} className="nav-link">
              Restaurants
            </Link>
          </li>
          <li className="nav-item">
            { user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
              )}
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path={"/"} element={RestaurantsList} />
          {/* <Route
            path="/restaurants/:id/review"
            render={(props)=> (
              <AddReview {...props} user={user} />
            )}
          />
          <Route 
            path="/restaurants/:id"
            render={(props) => (
              <Restaurant {...props} user={user} />
            )}
          /> */}
          <Route 
            path="/login"
            element = { <Login login={login} /> }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
