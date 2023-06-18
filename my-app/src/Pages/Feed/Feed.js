import { UseMedia } from "../../Context/MediaContext"
import { Post } from "../../components/Posts/Post"
import "./Feed.css"



export function Feed(){
    const {posts} = UseMedia()

    const sortedPosts = posts.sort((a,b) => b.data.timestamp - a.data.timestamp)


    return(
        <>
        <div className="feeds">
        {sortedPosts.map((post) => (
            <Post key={post.id} post={post}/>
        ))}
        </div>
        </>
    )
}