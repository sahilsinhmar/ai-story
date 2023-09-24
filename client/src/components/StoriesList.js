import React from "react";

import { StoryCard } from "./StoryCard";

export const StoriesList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <div key={post._id}>
          <StoryCard post={post}  />
        </div>
      ))}
    </div>
  );
};
