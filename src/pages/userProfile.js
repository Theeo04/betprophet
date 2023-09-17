import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

function UserProfile() {
  const [user, setUser] = useState(null);

  // Get Session User data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser(); // Destructure user data
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    fetchUser();
  }, []);

  //Download betts data
  const [posts, setPosts] = useState([]); // Initialize state for posts

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, `${user.id}`));

      try {
        const querySnapshot = await getDocs(q);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          postsData.push({ id: doc.allMatches, data: doc.bet });
        });
        setPosts(postsData); // Update state with post data
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  console.log(posts);

  return (
    <div className="text-white">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <div>
            <p>Email: {user.email}</p>
            <p>User ID: {user.id}</p>
          </div>
          {/* log out, delete user, change password */}
        </div>
      ) : (
        <p>User not authenticated.</p>
      )}
    </div>
  );
}

export default UserProfile;
