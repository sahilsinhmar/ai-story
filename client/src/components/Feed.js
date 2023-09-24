import axios from "axios";

import React from "react";
import { useState, useEffect } from "react";
import { StoriesList } from "./StoriesList";
const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const res = await axios.get(
          "https://aistory-o64w.onrender.com/api/v1/story/stories"
        );
        setAllPosts(res?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleGetPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) => regex.test(item.story) || regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const sortedPosts = [...allPosts]?.sort(
    (a, b) => b.votes.length - a.votes.length
  );

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a prompt or a story"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <div className="mt-4 overflow-auto shadow-lg max-w-[300px] border ">
        <h2 className="text-2xl font-semibold mb-4 text-center">Leaderboard</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Story
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Votes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPosts?.map((post) => (
              <tr key={post?._id}>
                <td className="px-6 py-4 whitespace-nowrap max-w-[200px] overflow-hidden">
                  <div className="text-sm text-gray-900">
                    {post.story.substr(0, 50)}...
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {post?.votes.length}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {searchText ? (
        <StoriesList data={searchedResults} />
      ) : (
        <StoriesList data={allPosts} />
      )}
    </section>
  );
};

export default Feed;
