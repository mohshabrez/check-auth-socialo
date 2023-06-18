import { Link } from "react-router-dom"
import "./ProfileCard.css"
export function ProfileCard(){
    return(
        <>
        <div className="profileCard">
           <div className="profileImages">
                <img src="https://static.wixstatic.com/media/c2cda0_ccf77c82f1ad463a82fcb49f9ed3b6da~mv2.png/v1/fit/w_1000,h_600,al_c,q_80/file.png" alt="coverImg" />
                <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="profileImg"/>
           </div>
           <div className="ProfileName">
             <span>ProfileName</span>
             <span>UI/UX designer</span>
           </div>
           <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>6,890</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>1</span>
                    <span>Followers</span>
                </div>
            </div>
            <hr />
           </div>
           <Link to="/ProfilePage"><span className="myprofile">My Profile</span></Link>
        </div>
        </>
    )
}