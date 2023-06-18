import "./MiddleNav.css"
import { v4 as uuid } from 'uuid';
import { Stories } from "../../components/Stories/Stories";
import { Feed } from "../Feed/Feed";
import { useState } from "react";
import { UseAuth } from "../../Context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../config/firebase";
import { Timestamp, addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";


export function MiddleNav(){
    const {currentUser} = UseAuth()
    const[error, setError] = useState(false)
    const[img, setImg] = useState(null)
    const [input, setInput] = useState('');


    const handleSubmit =  () =>{
       if(img){
        const storageRef = ref(storage, "Posts/" + uuid());
        
        const uploadTask = uploadBytesResumable(storageRef, img);
        
        uploadTask.on(
            'state_changed', 
          (snapshot) => {
            
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
                default: 
                console.log("some error occurred")
            }
          }, 
          (error) => {
            setError(true)
          }, 
          () => {
            try{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(db, "posts"), {
                       uid: currentUser.uid,
                       photoURL: currentUser.photoURL,
                       displayName: currentUser.displayName,
                       input,
                       img: downloadURL,
                       timestamp: serverTimestamp()
                     });
                      updateDoc(doc(db, "usersPosts", currentUser.uid),{
                       messages: arrayUnion({
                           id: uuid(),
                           uid: currentUser.uid,
                           photoURL: currentUser.photoURL,
                           displayName: currentUser.displayName,
                           input,
                           img: downloadURL,
                           timestamp: Timestamp.now()
                       })
                     }); 
               });
            }
            catch(e){
                console.log(e)
            }
            
          }
        ); 
       }
       else{
          addDoc(collection(db, "posts"), {
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            displayName: currentUser.displayName,
            input,
            timestamp: serverTimestamp()
          });
            updateDoc(doc(db, "usersPosts", currentUser.uid),{
            messages: arrayUnion({
                id: uuid(),
                uid: currentUser.uid,
                photoURL: currentUser.photoURL,
                displayName: currentUser.displayName,
                input,
                timestamp: Timestamp.now()
            })
          });
       }
        setInput("");
        setImg(null);
    }

    const removeImage = () => {
        setImg(null)
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSubmit()
    }
    return(
        <>
        <div className="middle">
            <Stories/>
            <div className="create-post">
                <div className="profile-photo">
                    <img src={currentUser.photoURL} alt="create-pic"/>
                </div>
                <input type="text"  placeholder={"What's happening  " + currentUser.displayName + "?"}  id="create-post" value={input} onChange={(e)=> setInput(e.target.value)} onKeyDown={handleKey}/>
                <input type="submit" onClick={handleSubmit} className="btn btn-primary"/>
                <div className="postOptions">
                   <label> <input className="option" style={{display:"none"}}  type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setImg(e.target.files[0])} /><span class="material-symbols-outlined" style={{color:"var(--photo)"}}>image</span></label>
                    <div className="option" style={{color:"var(--video)"}}><span class="material-symbols-outlined">smart_display</span></div>
                    <div className="option" style={{color:"var(--location)"}}><span class="material-symbols-outlined">location_on</span></div>
                    <div className="option" style={{color:"var(--schedule)"}}><span class="material-symbols-outlined">calendar_month</span></div>
                </div>
                {img && (
                <div className="shareImgContainer">
            <       img src={URL.createObjectURL(img)} alt="" className="shareImg" />
                    <span class="material-symbols-outlined" onClick={removeImage} style={{position:"absolute", top:"0", right:"20px", backgroundColor:"white",padding:"5px",borderRadius:"50%",cursor:"pointer"}}>cancel</span>
                </div>
                )}
            </div>
            <Feed/>
        </div>
        </>
    )
}