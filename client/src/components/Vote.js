import React from "react";
import { BiUpArrow } from "react-icons/bi";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Vote = ({ postId }) => {
  const { userId } = useAuth();

  const handleVote = async () => {
    try {
      const res = await axios.patch(
        `https://aistory-o64w.onrender.com/api/v1/story/${postId}/vote`,
        { userId }
      );

      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <BiUpArrow onClick={handleVote} className="cursor-pointer " size={32} />
    </div>
  );
};

export default Vote;
