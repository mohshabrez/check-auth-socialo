import { useEffect, useState } from "react"
import { UseAuth } from "../../Context/AuthContext"
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase"
import TimeAgo from 'timeago-react';


export function UsersPost({post}){
    const {currentUser} = UseAuth()
    const [likes, setLikes] = useState([])
    const[liked, setLiked] = useState(false)
    const[comment, setComments] = useState([])
    const[commentInput, setCommentInput] = useState("")
    const[commentVisible, setCommentVisible] = useState(false)

    const sortedComments = comment.sort((a,b) => b.data.timestamp - a.data.timestamp )


    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "posts", post.id, "likes"),(snapshot) => setLikes(snapshot.docs))
        return () => {
            unSub()
        }
    },[post.id])

    useEffect(()=> {
            setLiked(likes.findIndex((like) => like.id === currentUser?.uid)!== -1)
    },[likes, currentUser.uid])

    useEffect(()=>{
        const unSub = onSnapshot(collection(db, "posts", post.id, "comments"),
       (snapshot) => {
        setComments(snapshot.docs.map((snapshot)=> ({
            id: snapshot.id,
            data: snapshot.data()
        }) 
        ))
       })
       return() => {
        unSub()
       }
    },[post.id])

    const handleComment = async (e) => {
        e.preventDefault()

        await addDoc(collection(db, "posts", post.id, "comments"),{
            comment: commentInput,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            timestamp: serverTimestamp()
        })
        setCommentVisible(false)
        setCommentInput('')

    }



    // const tagList = post.tags.map((tag) =>{return (<>{tag}</>)})

    const likePost = async() => {
        if(liked){
            await deleteDoc(doc(db, "posts", post.id , "likes", currentUser.uid))
        }
        else{
            await setDoc(doc(db, "posts", post.id , "likes", currentUser.uid), {
                userId: currentUser.uid
            })
        }
    }

   console.log(post.displayName)

 
    return(
        <>
        <div className="usersPosts">
            <div className="feed">
        <div className="head">
            <div className="user">
                <div className="profile-photo">
                    <img  src={post?.photoURL} alt="feed-img"/>
                </div>
                <div className="ingo">
                    <h3>{post?.displayName}</h3>
                    <small>India,<TimeAgo datetime={new Date(post?.timestamp?.toDate()).toLocaleString()} locale='en'/></small>
                </div>
            </div>
            <a className="edit"><span class="material-symbols-outlined">more_horiz</span></a>
        </div>
        <div className="postinputline">{post?.input}</div>
        {post?.img && (
                <div className="photo">
                <img src={post?.img} alt="feedImg"/>
            </div>
        )}
        <div className="action-button">
            <div className="interaction-buttons">
                <a onClick={(e)=> {likePost()}}><span class="material-symbols-outlined">favorite</span></a>
                <a><span class="material-symbols-outlined" onClick={(e) => setCommentVisible(!commentVisible)}>add_comment</span></a>
                <a><span class="material-symbols-outlined">share</span></a>
            </div>
            <div className="bookmark">
                <a><span class="material-symbols-outlined">bookmark</span></a>
            </div>    
        </div>
        <div className="liked-by">
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <span><img src="https://th.bing.com/th/id/OIP.fpaUV35ECaGkz-YNCrBSwQHaHa?pid=ImgDet&rs=1"/></span>
            <p>Liked by <b>Profile1</b>and <b>121 others</b></p>
        </div>
        <div className="caption">
            <p><b>{post?.displayName}<br></br></b>{post?.input}<span className="harsh-tag">{}</span></p>
        </div>
        <div className=" comments text-muted">View all 277 comments</div>
        {commentVisible && <div><div className="commentbox" >
            <input placeholder="comment..." value={commentInput} onChange={(e)=> setCommentInput(e.target.value)} /><button className=" btn btn-primary" onClick={handleComment}>Comment</button>
            </div>
            {comment.length > 0 && <div>
                {sortedComments.map((com) => (
                    <div className="commentsbox">
                       <div className="commentSection">
                        <img className="profile-photo"  src={com.data.photoURL}/>
                        <div className="commentInfo">
                            <span>{com.data.displayName}</span><span><small>India,<TimeAgo datetime={new Date(com?.data?.timestamp?.toDate()).toLocaleString()} locale='en'/></small></span>
                            <p>{com.data.comment}</p>
                        </div>
                       </div>
                    </div>
                ))}
                </div>}
            </div>
           
        }    
        </div>
        </div>
        </>
    )
}