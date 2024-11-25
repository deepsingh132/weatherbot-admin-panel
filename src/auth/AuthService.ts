import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/api/v1/admin/";

class AuthService {
  async login(username: string, password: string) {
    const response = await axios.post(
      API_URL + "auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  async register(username: string, password: string) {
    return await axios.post(
      API_URL + "auth/register",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }

  async updateProfile(username: string, password: string) {
    const user = this.getCurrentUser();
    if (user) {
      try {
        const response = await axios.patch(
          API_URL + `admin/${this.getCurrentUser()?._id}`,
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          const updatedUser = { ...user, username };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }
  }

  async verifyToken() {
    return await axios.get(API_URL + "auth/verify", {
      withCredentials: true,
    });
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user) as User;
      if (parsedUser._id && parsedUser.username && parsedUser.hasAccess) {
        return parsedUser;
      }
    }
    return null;
  }

  async validateUser() {
    const user = this.getCurrentUser();
    if (user) {
      try {
        const response = await this.verifyToken();
        if (response.status !== 200) {
          toast.error("Session expired. Please login again.");
          this.logout();
          window.location.href = "/login";
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error: ", error);
        toast.error("Error verifying user. Please login again.");
        this.logout();
        window.location.href = "/login";
        return false;
      }
    }
    return false;
  }
}

export default new AuthService();
