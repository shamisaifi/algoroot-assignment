import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaUser, FaComment, FaIdBadge } from "react-icons/fa";
import { SlLike } from "react-icons/sl";
import { MdOutlineSort } from "react-icons/md";

const Hero = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebouncedQuery] = useState("");
  const [reverseSort, setReverseSort] = useState("default");

  const commentsPerPage = 10;
  const lastIndex = currentPage * commentsPerPage;
  const firstIndex = lastIndex - commentsPerPage;

  const fetchData = async () => {
    try {
      const result = await axios.get("https://dummyjson.com/comments");
      if (!result) {
        alert("Something went wrong");
        return;
      }
      setData(result.data.comments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const filteredData = data?.filter((item) =>
    item.user.fullName.toLowerCase().includes(debounceQuery.toLowerCase())
  );

  const currentItems =
    reverseSort == "default"
      ? filteredData.slice(firstIndex, lastIndex)
      : filteredData.reverse().slice(firstIndex, lastIndex);

  return (
    <>
      <div className="p-5 mt-18 border border-gray-300 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FaComment color="green"/> User Comments
            </h1>
            <p className="text-gray-500">
              Browse all the comments by random users
            </p>
          </div>

          <div className="flex gap-5">
            <form>
              <input
                className="border-2 border-gray-400 rounded-sm px-2 py-1"
                type="text"
                value={query}
                placeholder="Search by name"
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>

            <select
              className="border-2 border-gray-400 py-1 px-3 rounded-sm"
              name="sort"
              onChange={(e) => setReverseSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="default">Default</option>
              <option value="reverse">Reverse</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 mt-5">
          <table className="min-w-full bg-white border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4">
                  User <FaUser color="gray" className="inline w-10" />
                </th>
                <th className="py-2 px-4">
                  ID <FaIdBadge color="gray" className="inline w-10" />
                </th>
                <th className="py-2 px-4">
                  Comment <FaComment color="gray" className="inline w-10" />
                </th>
                <th className="py-2 px-4">
                  Likes <SlLike color="gray" className="inline w-10" />
                </th>
                <th className="py-2 px-4">
                  Post ID <MdOutlineSort color="gray" className="inline w-10" />
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4 text-left">{item.user.fullName}</td>
                    <td className="py-2 px-4 text-left break-words max-w-xs">
                      {item.body}
                    </td>
                    <td className="py-2 px-4">{item.likes}</td>
                    <td className="py-2 px-4">{item.postId}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    Loading....
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="my-10 flex justify-center items-center gap-5">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className="border px-6 py-2 text-lg rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-xl font-semibold">Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= data.length / commentsPerPage}
          className="border px-6 py-2 text-lg rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Hero;
