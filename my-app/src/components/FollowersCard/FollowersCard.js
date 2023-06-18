import "./FollowersCard.css"
import { UseMedia } from "../../Context/MediaContext"
export function FollowersCard(){
    const {state} = UseMedia()
    return(
        <>
        <div className="FollowersCard">
            <h3>Who is following you!!!</h3>
            {state.PostsData.map((post) => {
                return(
                    <>
                    <div className="follower">
                        <div>
                            <img className="followerImg" src={post?.profile}  alt="profilepic"/>
                            <div className="name">
                                <span>{post?.username}</span>
                                <span>@{post?.username}</span>
                            </div>
                        </div>
                        <button className="follow-btn">Follow</button>
                    </div>
                    </>
                )
            })}
        </div>
        </>
    )
}