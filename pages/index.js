import axios from 'axios';
import {useState,useEffect} from 'react';
const Home = () => {
  const [posts,setPosts]=useState([]);
const apiEndPoint='https://jsonplaceholder.typicode.com/posts'
useEffect(()=>{
  const getPosts=async ()=>{
    const {data:res}=await axios.get(apiEndPoint);
    setPosts(res)
  };
  getPosts();
},[]);


//ADD POST TO DATABASE
const addPost=async()=>{
  const post={title:'New Title of New Post',body:"new body"};
  await axios.post(apiEndPoint,post);
  setPosts([post,...posts])
}

//UPDATE POST IN DATABASE
const handleUpdate=async(post)=>{
  post.title="Updated title";
  await axios.put(apiEndPoint + '/' + post.id);
  const postsClone=[...posts];
  const index = postsClone.indexOf(post);
  postsClone[index]={...post};
  setPosts(postsClone)
}


//DELETE POST FROM DATABASE
const handleDelete=async(post)=>{
await axios.delete(apiEndPoint + '/' + post.id + post);
setPosts(posts.filter((p)=> p.id !== post.id));
}


    return ( 
      <div className="container">
       <div className="info-box">
         <div>
         <span>task discription :</span>
         <span>impliment CRUD oparation into next app</span>
         </div>
         <div>
         <span>task author :</span>
         <span>borhan najaflu</span>
         </div>
       </div>
       <h2>there are {posts.length} post here</h2>
       <button onClick={addPost} className="btn-primary btn-sm">Add Post</button>
       <table className="table">
         <thead>
           <tr>
             <th>Title</th>
             <th>Update</th>
             <th>Delete</th>
           </tr>
         </thead>
         <tbody>
           {posts.map(post =>
           <tr key={post.id}>
             <td>{post.title }</td>
             <td><button onClick={()=>handleUpdate(post)} className="btn-success btn-sm">Update</button></td>
             <td><button onClick={()=>handleDelete(post)} className="btn-danger btn-sm">Delete</button></td>
           </tr>
            )}
         </tbody>
       </table>
      </div>
    );
}

export default Home;