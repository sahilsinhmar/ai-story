/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

import PuffLoader from "react-spinners/PuffLoader";
import { useNavigate } from "react-router-dom";

import React from "react";
import Navbar from "../components/Navbar";

const Story = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [story, setStory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { userId } = useAuth();
  const { user, isSignedIn } = useUser();
  const name = user?.firstName;

  const handleGenerateStory = async () => {
    if (!prompt) {
      setError("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://aistory-o64w.onrender.com/api/v1/ai/generate-story",
        {
          prompt,
        }
      );
      const result = await res?.data;
      setStory(result.story);
      setError("");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostStory = async () => {
    if (!prompt || !story) {
      setError("Please enter a prompt and generate a story.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(
        `https://aistory-o64w.onrender.com/api/v1/story/${userId}/story`,
        { prompt, story, name }
      );

      setStory("");
      setPrompt("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full font-inter flex flex-col items-center ">
      <Navbar />
      {isSignedIn && (
        <div className="p-4  w-full">
          <div className="flex flex-col items-center gap-2 my-2">
            <label className="block text-3xl font-semibold">Prompt</label>
            <input
              type="text"
              required
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter a prompt to generate a story"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 text-lg"
            />
            <button
              onClick={handleGenerateStory}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
            >
              Generate Story
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}

            {isLoading && <PuffLoader color="#36d7b7" />}
          </div>
          <div className="flex flex-col items-center mt-2">
            {story && (
              <div className="border max-h-[300px] max-w-[700px] overflow-auto">
                <p>{story}</p>
              </div>
            )}
            {story && (
              <button className="black_btn my-2" onClick={handlePostStory}>
                Post
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Story;
