import { useEffect, useState } from "react"
import "./ProfilePage.css"
import { UseAuth } from "../../Context/AuthContext"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../config/firebase"
import { UsersPost } from "../../components/UserPosts/UsersPost"
import { Link } from "react-router-dom"




export function ProfilePage(){
    const[usersPost, setUsersPosts ] = useState([])
    const {currentUser} = UseAuth()


    // const sortedComments = comment.sort((a,b) => b.data.timestamp - a.data.timestamp )

    useEffect(()=>{
        const getUsersPost = () => {
            const unSub = onSnapshot(doc(db, "usersPosts", currentUser.uid),
            (doc) => {
                doc.exists()&& setUsersPosts(doc.data().messages)
            }
            )
            return() => {
                unSub();
            }
        }
        currentUser.uid && getUsersPost()
    },[currentUser.uid])


    return(
        <>
        <div className="profilePage">
            <div className="profileImg">
                <div className="profile-img">
                    <img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1" alt="profile-img" />
                </div>
                <div className="profileInfo">
                    <div className="postsCount">
                        <span><strong>48</strong></span>
                        <p>Posts</p>
                    </div>
                    <div className="followersCount">
                        <span><strong>438</strong></span>
                        <p>Followers</p>
                    </div>
                    <div className="followingCount">
                        <span><strong>200</strong></span>
                        <p>Following</p>
                    </div>
                </div>
            </div>
            <div className="About">
                <div className="profile-about">
                    <p>@profileName</p>
                    <p>Blogger</p>
                    <p>Studied</p>
                    <p>Bio</p>
                    <p>Organization</p>
                    <p>Interests</p>
                </div>
                <div className="profile-btns">
                    <div className="btns-div">
                    <Link to="/EditProfile"><button  className="btn btn-primary">Edit Profile</button></Link>
                    <button  className="btn btn-primary">Contact</button>
                    <button  className="btn btn-primary">Email</button>
                    </div>
                </div>
            </div>
            <div className="profile-posts">
        {usersPost.map((post) => (
            <UsersPost key={post.id} post ={post} />
        ))}
            </div>
        </div>
        </>
    )
}