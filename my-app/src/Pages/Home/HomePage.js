import "./HomePage.css"
import { SideNav } from "../SideNav/SideNav";
import { MiddleNav } from "../MiddleNav/MiddleNav";
import { RightNav } from "../RightNav/RightNav";
import { UseAuth } from "../../Context/AuthContext";

export function HomePage(){
    const {currentUser} = UseAuth()
    return(
        <div className="main">
        <div className="container">
            <div className="left">
                <a className="profile" href="//">
                    <div className="profile-photo">
                        <img src={currentUser.photoURL} alt="profileImg" />
                    </div>
                    <div className="handle">
                        <h4>{currentUser.displayName}</h4>
                        <p className="text-muted">
                            @{currentUser.displayName}
                        </p>
                    </div>
                </a>
                <div className="sidebar">
                    <SideNav/>
                </div>
            </div>
            <div className="middle">
               <MiddleNav/>
            </div>
            <div className="right">
                <RightNav/>
            </div>

        </div>
        </div>
    )
}