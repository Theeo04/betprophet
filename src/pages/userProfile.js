import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { AiOutlineHome } from "react-icons/ai";
import { useRouter } from "next/router";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const router = useRouter();

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
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // Sign Out
  async function signOutUser() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out user:", error);
      } else {
        console.log("User logged out successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  }

  // More details about your bet
  const showMoreDetails = (item) => {
    setSelectedItem(item);
  };

  const closeMoreDetails = () => {
    setSelectedItem(null);
  };

  return (
    <div className="text-white">
      {/* Navbar */}
      <div className="mt-4 flex space-x-[200px] md:space-x-[340px] lg:space-x-[530px] xl:space-x-[600px] 2xl:border-b pb-5">
        <div className="flex ml-5 mt-1">
          <AiOutlineHome
            onClick={() => router.push("/")}
            className="text-[40px] hover:cursor-pointer"
          />
          <div className="ml-5 text-[30px] font-[500]">{user?.email}</div>
        </div>

        {user && (
          <div className="flex space-x-[50px] mr-10">
            <button
              className="h-50px w-[140px] text-[30px] font-[500] overflow-hidden text-white transition-transform transition-box-shadow transition-color bg-transparent hover:text-black hover:shadow-md hover:bg-purple-500 hover:cursor-pointer hover:rounded-2xl"
              onClick={signOutUser}
            >
              Log Out
            </button>
            <button
              className="h-[60px] w-[245px] text-[30px] font-[500] rounded-2xl hover:bg-red-800 hover:text-black"
              onClick={deleteUser}
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
        <div className="ml-[120px] mt-[20px] flex space-x-5">
          <ul>
            {posts.map((item, index) => (
              <div key={index} className="flex">
                <div>
                  <li className="w-[400px] h-[250px] bg-purple-500 rounded-2xl flex flex-col space-y-[8px] mt-[60px] mb-[100px]">
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
                      Total Odd:{" "}
                      <span className="ml-[100px]">{item.data.odd}</span>
                    </p>
                    <p className="text-[25px] font-[500] pb-1 pl-5">
                      Total Win:{" "}
                      <span className="ml-[100px]">
                        {" "}
                        {(item.data.odd * item.data.bet).toFixed(2)}{" "}
                      </span>
                    </p>
                    <button
                      onClick={() => {
                        showMoreDetails(item);
                      }}
                      className="bottom-0 right-0 bg-purple-600 text-[25px] font-[500] text-white p-2 flex justify-center mt-[30px]"
                    >
                      Show my bet!{" "}
                      <span className="mt-[6px] ml-2 text-[28px]">
                        <BsFillArrowRightSquareFill />
                      </span>
                    </button>
                  </li>
                </div>
                <div>
                  {selectedItem === item && (
                    <div className="flex rounded-2xl mt-[60px] flex-col justify-center bg-purple-500 pr-5 ml-[10px] w-[500px] lg:2xl:ml-[30px] lg:w-[700px] xl:ml-[130px]">
                      <ul>
                        {selectedItem === item && (
                          <div className=" flex flex-col justify-center bg-purple-500 pr-5 ml-[10px] w-[500px] lg:2xl:ml-[30px] lg:w-[700px] xl:ml-[130px]">
                            <p className="flex justify-center mb-4 text-[27px] font-[500] lg:text-[30px] ">
                              Total games: {selectedItem.data.allMatches.length}
                            </p>
                            <ul>
                              {selectedItem.data.allMatches.map(
                                (match, matchIndex) => (
                                  <li className="flex mb-3" key={matchIndex}>
                                    <p className="ml-2 text-[20px] 2xl:text-[22px] 2xl:ml-7 font-[500] lg:text-[30px] lg:ml-3">
                                      {match.home}
                                    </p>
                                    <p className="ml-2 text-[20px] 2xl:text-[22px] 2xl:ml-7 font-[500] lg:text-[30px] lg:ml-3">
                                      vs
                                    </p>
                                    <p className="ml-2 text-[20px] 2xl:text-[22px] 2xl:ml-7 font-[500] lg:text-[30px] lg:ml-3">
                                      {match.away}
                                    </p>
                                    <p className="ml-2 text-[20px] 2xl:text-[22px] 2xl:ml-7 font-[500] lg:text-[30px] lg:ml-3">
                                      {match.oddChoosed}:
                                    </p>
                                    <p className="ml-1 text-[20px] 2xl:text-[22px] 2xl:ml-7 font-[500] lg:text-[30px] text-black">
                                      {match.oddMatch.toFixed(2)}
                                    </p>
                                  </li>
                                )
                              )}
                            </ul>
                            <button
                              className="text-[25px] font-[500] hover:text-black mt-4 bg-purple-500 pb-1 pt-1"
                              onClick={closeMoreDetails}
                            >
                              Close
                            </button>
                          </div>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
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
