import "./RootLayout.css"
import React  from "react"
import {Link, Outlet} from "react-router-dom"
import { UseAuth } from "../../Context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";

export function RootLayout(){
  const {currentUser} = UseAuth()
  const navigate = useNavigate();
  const logoutClick = () => {
    signOut(auth)
    navigate("/login")
  }
    return(
        <>
         <div className="root-layout">
         <header>
        <nav className="nav">
          <div className="container">
          <div className="backarrow"><Link to="/HomePage"><span class="material-symbols-outlined">keyboard_double_arrow_left</span></Link></div>
            <h2 className="log">SocialMedia</h2>
            <div className="search-bar">
            <span class="material-symbols-outlined">search</span>
                <input type="search" placeholder="search for"/>
            </div>
            <div className="create">
                <label className="btn btn-primary" for="create-post">Create</label>
                <div className="profile-photo">
                    <img src={currentUser.photoURL} alt=""/>
                </div>
                <span class="material-symbols-outlined" onClick={logoutClick}>logout</span>
            </div>

          </div>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
        </>
    )
}