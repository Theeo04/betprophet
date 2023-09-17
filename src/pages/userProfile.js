import React, { useEffect, useState } from "react";
import { supabase } from "../../supabase";

function UserProfile() {
  const [user, setUser] = useState(null);

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

  return (
    <div className="text-white">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
          {/* Display other user information here */}
        </div>
      ) : (
        <p>User not authenticated.</p>
      )}
    </div>
  );
}

export default UserProfile;
