import "./Signup.css"
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { auth, db, storage }  from "../../config/firebase"
import {  createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

export function Signup(){
    const[img, setImg] = useState(null)
    const[email , setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[error, setError] = useState(false)
    const[displayName, setDisplayName] = useState('') 
    const navigate = useNavigate()
    
    const handleRegister= async (e) => {
        e.preventDefault()

        // const displayName = e.target[0].value;
        // const email = e.target[1].value;
        // const password = e.target[2].value;

        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)
            
            const storageRef = ref(storage, "usersImages/" +  displayName);

            const uploadTask = uploadBytesResumable(storageRef,img);


            uploadTask.on('state_changed',
                (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                console.log('Upload is paused');
            break;
                case 'running':
                console.log('Upload is running');
            break;
            default :
                console.log('Upload got error')
            }
            }, 
            (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
             case 'storage/unauthorized':
            // User doesn't have permission to access the object
                break;
            case 'storage/canceled':
            // User canceled the upload
            break;
            case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
        default :
        console.log('storage got error')
      // ...
      // ...
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    try{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateProfile(res.user, {
                displayName, 
                photoURL: downloadURL,
             });             
      
          setDoc(doc(db, "users", res.user.uid), {
             uid: res.user.uid,
             displayName,
             email,
             photoURL: downloadURL,
             });

          setDoc(doc(db, "usersPosts", res.user.uid), {messages:[]})    
          });    
    }
    catch(error){
        console.log(error.message)
    }    
    });
  }
 catch(error){
     console.log(error.message)
    setError(true)
        }
        navigate("/Login")
    }

    return(
        <>
        <div className="signUp">
            <div className="singuplogo">
            </div>
            <div className="signupForm">
                <h1>Sign Up</h1>
                <div className="formLoginData">
                    <div className="image-line">
                        <img src={img ? URL.createObjectURL(img) : "/../src/Images/profile.webp"} alt="" className="profileImg"/>
                    <div className="upload-box">
                        <label htmlFor="file">
                            <span class="material-symbols-outlined">drive_folder_upload</span>
                        <input type="file" name="file" id="file" accept=".png,.jpeg,.jpg"  style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])}/>
                        </label>
                    </div>
                    </div>
                    <div >
                        <div>
                            <label>Enter Your Name*</label>
                            <input type="text" placeholder="UserName" required onChange={(e) => setDisplayName(e.target.value)}/><span class="material-symbols-outlined" style={{ top:"-27px",left:"220px"}}>account_circle</span>
                        </div>
                        <div>
                            <label>Enter Your Email*</label>
                            <input type="text" placeholder="test@gmail.com" required  onChange={(e) => setEmail(e.target.value)}/><span class="material-symbols-outlined" style={{ top:"-27px",left:"220px"}}>drafts</span>
                        </div>
                        <div>
                            <label>Enter Your Password*</label>
                            <input type="password" placeholder="Password" minLength={6} required onChange={(e) => setPassword(e.target.value)}/><span class="material-symbols-outlined" style={{top:"-27px", left:"220px"}}>lock_open</span>
                        </div>
                        <div>
                            <label>Confrim Password Again*</label>
                            <input type="password" placeholder="Confirm Password" required /><span class="material-symbols-outlined" style={{top:"-27px", left:"220px"}}>enhanced_encryption</span>
                        </div>
                        <button style={{marginLeft:"40px"}} value="Sign Up"  onClick={handleRegister}>Create a New Account</button>
                        <p style={{marginLeft:"30px", color:"white", marginTop:"20px"}}>Already have an Account<Link to="/login" style={{color:"rgb(13, 201, 230)"}}>  Sign In</Link></p>
                    </div>
                        {error && <span>Something went wrong</span>}
                </div>
            </div>
        </div>
        </>
    )
}