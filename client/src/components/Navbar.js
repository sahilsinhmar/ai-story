import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link to="/" className="logo_text">
        Ai-Story
      </Link>
      <div className="flex gap-5">
        {isSignedIn ? (
          <div className="flex gap-4">
            <p>Welcome {user.firstName}</p>

            <Link to="/create" className="outline_btn">
              Generate Story
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : (
          <div>
            <Link className="black_btn" to="/sign-in">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
