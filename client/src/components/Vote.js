import React from "react";
import { BiUpArrow } from "react-icons/bi";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const Vote = ({ postId }) => {
  const { userId } = useAuth();

  const handleVote = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3001/api/v1/story/${postId}/vote`,
        { userId }
      );
      console.log(res?.data);
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
