import AuthService from "@/auth/AuthService";
import React, { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "@/context/globalContext";
import { AxiosError } from "axios";
import Input from "@/components/ui/Input";

function Profile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toggleSidebar, isSidebarOpen } = useGlobalContext();

  useEffect(() => {
    async function verifyToken() {
      setLoading(true);
      try {
        await AuthService.validateUser();
        setLoading(false);
      } catch (error) {
        console.error("Error: ", error);
        setLoading(false);
        toast.error("Error verifying user. Please login again.");
        AuthService.logout();
      }
    }
    setLoading(false);
    verifyToken();
  }, []);

  const onChangeUsername = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.value === "") {
      toast.error("Username cannot be empty");
    }

    const username = e.currentTarget.value;
    setUsername(username);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    const password = e.currentTarget.value;
    setPassword(password);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser() as User;
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSave = async () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }

    if (!username || !password) {
      toast.error("Please enter username and password to update profile");
      return;
    }

    setLoading(true);
    try {
      const res = await AuthService.updateProfile(username, password);
      if (res) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Error updating profile");
      }
      setLoading(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Error updating profile");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col w-full md:space-y-12 md:justify-around justify-evenly h-full items-center">
      {loading && (
        <div className="flex overlay w-full h-full bg-white bg-opacity-50 absolute top-0 left-0 z-50 justify-center items-center">
          <div className="flex items-center justify-center animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      {/* <h1 className="text-2xl font-bold">Profile</h1> */}
      <div className="md:flex md:flex-row flex flex-col md:space-y-0 space-y-14 w-full justify-around items-center max-w-2xl p-4">
        <img
          src={`https://ui-avatars.com/api/?name=${currentUser?.username}&background=4114c8&color=ffffff&bold=true`}
          alt=""
          className={`w-36 h-36 rounded-full`}
        />
        <div className="flex flex-col w-full items-center space-y-8">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your username
            </label>
            <Input
              type="text"
              name="username"
              value={username ? username : currentUser?.username}
              id="username"
              placeholder="username"
              onChange={onChangeUsername}
            />
            {/* <input
              type="username"
              name="username"
              value={username ? username : currentUser?.username}
              id="username"
              className="w-full min-w-[300px] inputBox bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-primary block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="username"
              required
              onChange={onChangeUsername}
            /> */}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="••••••••"
              onChange={onChangePassword}
            />
            {/* <input
              type="password"
              name="password"
              id="password"
              className="inputBox min-w-[300px] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="••••••••"
              required
              onChange={onChangePassword}
            /> */}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col space-y-1">
            <label className="font-semibold">Email</label>
            <p>{currentUser?.email}</p>
          </div> */}

      <button
        onClick={handleSave}
        disabled={loading && !username && !password}
        type="submit"
        className={`text-white ${
          loading ? "cursor-not-allowed" : "cursor-pointer"
        } px-24 w-1/3 whitespace-nowrap  justify-center bg-primary hover:bg-indigo-800 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-sm py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center`}
      >
        {loading && (
          <svg
            aria-hidden="true"
            role="status"
            className="inline w-6 h-6 me-3 text-gray-400 fill-white animate-spin"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        {loading ? <span>Saving...</span> : <span>Update profile</span>}
      </button>
    </div>
  );
}

export default Profile;
