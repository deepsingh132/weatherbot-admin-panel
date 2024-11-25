import { useState } from "react";
import { banUser, deleteUser, unbanUser } from "@/utils/apiRequests";
import Spinner from "../ui/spinner";
import "@/App.css";
import Input from "../ui/Input";
import { CircleCheck, CircleX,Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Data = {
  _id: string;
  name: string;
  chatId: string;
  isBanned: boolean;
  lastAccess: Date;
  createdAt: Date;
  avatar: string | null;
};

function Table({ type, data, isFetching, reFetch, setReFetch }: { type: string, data: Data[], isFetching: boolean, reFetch: boolean, setReFetch: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [search, setSearch] = useState("");
  const placeholderAvatar =
    "https://alumni.engineering.utoronto.ca/files/2022/05/Avatar-Placeholder-400x400-1.jpg";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

   const filteredData = data.filter((item) => {
     const matchesSearch = item.name
       .toLowerCase()
       .includes(search.toLowerCase());
     return matchesSearch;
   });

   const paginatedData = filteredData.slice(
     (currentPage - 1) * itemsPerPage,
     currentPage * itemsPerPage
   );

   const pageCount = Math.ceil(filteredData.length / itemsPerPage);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setSearch(e.target.value);
     setCurrentPage(1);
  };

   const handlePageChange = (pageNumber: number) => {
     setCurrentPage(pageNumber);
  };

  const handleBanUser = async (userId: string) => {
      const result = await banUser(userId);

      if (!result) {
        toast.error(`Failed to ban user ${userId}`);
        return;
    }

      toast.success("User banned successfully!");
      setReFetch(!reFetch);
  };

  const handleUnbanUser = async (userId: string) => {
    const result = await unbanUser(userId);
    if (!result) {
      toast.error(`Failed to unban user ${userId}`);
      return;
    }

    toast.success("User unbanned successfully!");
    setReFetch(!reFetch);
  }

  const handleDeleteUser = async (userId: string) => {
    const response = confirm("Are you sure you want to delete this user?");

    if (!response) {
      return;
    }

    const result = await deleteUser(userId);
    if (!result) {
      toast.error(`Failed to delete user ${userId}`);
      return;
    }

    toast.success("User deleted successfully!");
    setReFetch(!reFetch);
  }


  const renderRows = () =>
    paginatedData.
      sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).
      map((item) => (
      <tr
        key={item._id}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="flex items-center font-semibold">
            <img
              className="w-10 h-10 rounded-full"
              src={item.avatar || placeholderAvatar}
              alt="Avatar"
            />
            <div className={`ps-3 max-w-[100px] md:max-w-[300px] text-ellipsis overflow-hidden`}>{item.name}</div>
          </div>
        </td>
        <td className="md:table-cell hidden px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          {item.chatId}
        </td>
        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="text-xs md:table-cell hidden text-gray-500">
              {new Date(item.createdAt).toLocaleDateString(
                undefined, {
                timeZone: "Asia/Kolkata"
              }
            )}
          </div>
          <div className="md:text-base">
              {new Date(item.createdAt).toLocaleTimeString(
                undefined, {
                timeZone: "Asia/Kolkata"
              }
            )}
          </div>
        </td>
        <td className="px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
          <div className="text-xs md:flex hidden">

            {
              type === "recent-users" &&
              <div title="Ban User"
                onClick={() => handleBanUser(item._id)}
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-200 rounded">
                <CircleX className="text-red-500 w-[18px] h-[18px]" />
              </div>
            }

            {
              type === "recent-banned-users" &&
              <div title="Unban User"
                onClick={() => handleUnbanUser(item._id)}
                className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-200 rounded">
                <CircleCheck className="text-green-500 w-[18px] h-[18px]" />
              </div>
            }

            <div title="Delete User"
              onClick={() => handleDeleteUser(item._id)}
              className="flex items-center px-2 py-1 cursor-pointer hover:bg-red-200 rounded">
              <Trash2 className="text-red-500 w-[18px] h-[18px]"/>
            </div>
          </div>
        </td>

      </tr>
    ));

  return (
    <div className="relative overflow-x-auto shadow-md rounded-lg">
      <div className="flex items-center justify-between flex-wrap md:flex-row space-y-4 px-6 py-2 bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <div>
            <span className="text-gray-700 font-semibold dark:text-gray-400">
              {type === "recent-users" ? "Recent Users" : "Recent Banned Users"}
            </span>
          </div>
        </div>

        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative !mt-0">
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <Input
            type="text"
            name="search"
            value={undefined}
            id="table-search-users"
            placeholder="Search for a user"
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">User</th>
            <th className="px-6 md:block hidden py-3">#ID</th>
            <th className="px-6 py-3">
              {type === "recent-users" ? "Joined At" : "Banned At"}
            </th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                <Spinner />
              </td>
            </tr>
          ) : filteredData.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 w-full text-center bg-gray-50 dark:bg-gray-800 text-gray-500">
                No {type === "recent-users" ? "users" : "banned users"} found
              </td>
            </tr>
          ) : (
            renderRows()
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex justify-center p-4">
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Table;
