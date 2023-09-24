import { useState } from "react";
import Vote from "./Vote";
import React from "react";
import { useAuth } from "@clerk/clerk-react";
export const StoryCard = ({ post }) => {
  const [copied, setCopied] = useState("");
  const { isSignedIn } = useAuth();

  const handleCopy = () => {
    setCopied(post.story);
    navigator.clipboard.writeText(post.story);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-star items-center gap-3 ">
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.name}
            </h3>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <img
            src={
              copied === post.story
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy"
          />
        </div>
        {isSignedIn && (
          <div className="flex items-center gap-2 text-lg">
            <Vote postId={post?._id} />
            {post.votes.length}
          </div>
        )}
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="my-4 font-satoshi text-sm text-gray-700 overflow-auto">
        {post.story}
      </p>
    </div>
  );
};
