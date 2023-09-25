import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { BsFillArrowRightSquareFill } from "react-icons/bs";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

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

  useEffect(() => {
    const fetchPosts = async () => {
      // Check if user is defined before querying the database
      if (!user) {
        return;
      }

      const q = query(collection(db, `${user.id}`));

      try {
        const querySnapshot = await getDocs(q);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          postsData.push({ id: doc.id, data: doc.data() });
        });
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user]);

  console.log(posts);

  // Delete User Account
  async function deleteUser() {
    try {
      const { data, error } = await supabase.auth.admin.deleteUser(
        `${user.id}`
      );

      if (error) {
        console.error("Error deleting user:", error);
      } else {
        console.log("User deleted successfully:", data);
        // Redirect to a confirmation page or perform any necessary actions
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  //Sign Out
  async function signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out user:", error);
      } else {
        console.log("User logged out successfully");
        // Redirect to a confirmation page or perform any necessary actions
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  }

  function showMoreDetails(item) {
    // You can implement your logic here to display more details about the item
    // For example, you can open a modal or update a state variable to show details.
    console.log("Showing more details for item:", item);

    // Example: Open a modal with the item details
    // You can use a state variable to control the modal's visibility.
    // setModalVisible(true);
  }

  return (
    <div className="text-white">
      {/* Navbar */}
      <div className=" mt-4 flex space-x-[200px] md:space-x-[340px] lg:space-x-[530px] xl:space-x-[860px] 2xl:border-b pb-5">
        <div className="ml-5 text-[33px] font-[500]">{user?.email}</div>
        {user && (
          <div className="flex space-x-[50px] mr-10">
            <button
              className="h-50px w-[140px] text-[33px] font-[500] overflow-hidden text-white transition-transform transition-box-shadow transition-color bg-transparent hover:text-black hover:shadow-md hover:bg-purple-500 hover:cursor-pointer hover:rounded-2xl"
              onClick={signOutUser}
            >
              Log Out
            </button>
            <button
              className="h-[60px] w-[245px] text-[33px] font-[500] rounded-2xl hover:bg-red-800 hover:text-black"
              onClick={() => deleteUser(user.id)}
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {/* Details */}
      <h1 className="text-[50px] ml-[80px] mt-3 text-purple-500 font-[600]">
        Your Placed Bets!
      </h1>
      {user && posts ? (
        <div className="ml-[120px] mt-[20px]">
          <ul>
            {posts.map((item, index) => (
              <li
                key={index}
                className="w-[400px] h-[200px] bg-purple-500 rounded-2xl flex flex-col"
              >
                <p className="text-[25px] font-[500] pb-1 pl-5 pt-1">
                  Credits Placed:{" "}
                  <span className="ml-[70px]"> {item.data.bet} </span>
                </p>
                <p className="text-[25px] font-[500] pb-1 pl-5">
                  Number Games:{" "}
                  <span className="ml-[57px]">
                    {" "}
                    {item.data.allMatches.length}
                  </span>
                </p>
                <p className="text-[25px] font-[500] pb-1 pl-5">
                  Total Odd: <span className="ml-[100px]">{item.data.odd}</span>
                </p>
                <p className="text-[25px] font-[500] pb-1 pl-5">
                  Total Win:{" "}
                  <span className="ml-[100px]">
                    {" "}
                    {(item.data.odd * item.data.bet).toFixed(2)}{" "}
                  </span>
                </p>
                <button
                  onClick={() => showMoreDetails(item)}
                  className=" bottom-0 right-0 bg-purple-600 text-[25px] font-[500] text-white p-2 flex justify-center"
                >
                  Show my bet!{" "}
                  <span className="mt-[6px] ml-2 text-[28px]">
                    <BsFillArrowRightSquareFill />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No Placed Bets!</p>
      )}
    </div>
  );
}

export default UserProfile;
