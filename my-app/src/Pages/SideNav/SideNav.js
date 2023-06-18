import "./SideNav.css"
import { Notifications } from "../../components/Notifications/Notifications";
import { Theme } from "../../components/Theme/Theme";

export function SideNav(){
    return(
        <div className="left">
        <div className="sidebar">
            <a className="menu-item">
                <span class="material-symbols-outlined">home</span><h3>Home</h3>
            </a>
            <a className="menu-item ">
                <span class="material-symbols-outlined">explore</span><h3>Explore</h3>
            </a>
            <a className="menu-item " id="notifications">
                <span   span class="material-symbols-outlined"><small className="notification-count">9+</small>notifications</span><h3>Notifications</h3>
                <div className="notifyBar">
                    <Notifications/>
                </div>
            
            </a>
            <a className="menu-item "  id="messages-notifications">
                <span class="material-symbols-outlined"><small className="notification-count">6</small>chat</span><h3>Chat</h3>
            </a>
            <a className="menu-item ">
                <span class="material-symbols-outlined">bookmark</span><h3>Bookmark</h3>
            </a>
            <a className="menu-item ">
                <span class="material-symbols-outlined">monitoring</span><h3>Analytics</h3>
            </a>
        <a className="menu-item ">
            <span class="material-symbols-outlined">palette</span><h3>Theme</h3>
            <div className="theme-card">
                <Theme/>
            </div>
        </a>
        <a className="menu-item ">
            <span class="material-symbols-outlined">settings</span><h3>Settings</h3>
        </a>
        </div>
         {/* end */}
         <label for="create-post" className="btn btn-primary">Create Post</label>
        </div>
    )
}