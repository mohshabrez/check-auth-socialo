import { UseAuth } from "../../Context/AuthContext"
import { SideNav } from "../../Pages/SideNav/SideNav"
import "./EditProfile.css"

export function Editprofile(){
    const {currentUser} = UseAuth()
    return(
        <>
        <div className="editProfile">
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
            </div>
            
            <div className="profileSection">
                <h1>Edit Profile</h1>
                <div className="EditImg">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="editImg"/>
                    <span class="material-symbols-outlined" style={{backgroundColor:"hsl(252, 75%, 60%)", borderRadius:"50%", fontSize:"xx-large", position:"relative", left:"30.3rem", top:"-4.5rem"}}>edit</span>
                </div>
                <div className="EditForm">
                    <form className="formElements">
                        <label> User Name</label>
                            <input type="text" placeholder="" />
                        
                        <label> Email </label>
                            <input type="email" placeholder="" />
                       
                        <label> Date</label>
                            <input type="Date" placeholder="" />
                        
                        <label> Phone Number </label>
                            <input type="Number" placeholder="" />
                       
                        <label> Bio </label>
                            <input type="text" placeholder="" />
                        
                        <label> Portfolio</label>
                            <input type="link" placeholder="" />
                        <div className="form-btns">
                            <button className="btn btn-primary">Save</button>
                            <button className="btn btn-primary">Cancel</button>
                        </div>
                        
                        
                    </form>
                </div>
            </div>
           
        </div>
        </>
    )
}