import { FollowersCard } from "../../components/FollowersCard/FollowersCard"
import { FriendRequest } from "../../components/FriendRequest/FriendRequest"
import { MessageCategory } from "../../components/MessagesCategory/MessageCategory"
import {ProfileCard} from "../../components/ProfileCard/ProfileCard"
import "./RightNav.css"
export function RightNav(){
    return(
        <>
        <div className="right">
            <ProfileCard/>
            <FollowersCard/>

            {/* <div className="messages">
                <div className="heading">
                    <h4>Messages</h4><span class="material-symbols-outlined">edit</span>
                </div>
                <div className="search-bar">
                    <span class="material-symbols-outlined">search</span>
                    <input type="search" placeholder="Search Messages" id="message-search"/>
                </div>
                <MessageCategory/>
            </div>
            <FriendRequest/> */}
        </div>
        </>
    )
}