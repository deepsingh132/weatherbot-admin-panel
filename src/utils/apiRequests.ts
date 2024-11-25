import axios from "axios";

const API_URL =  import.meta.env.VITE_BACKEND_URL + "/api/v1/admin";

export const getFeatures = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/features`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting features: ", error);
    return null;
  }
};

export const editKey = async (keyName: string, value: string) => {
  try {
    const response = await axios.put(
      `${API_URL}/settings/keys/${keyName.split(" ").join("-")}`,
      {
        apiKey: value,
        botToken: value
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in editing key: ", error);
    return null;
  }
}

export const deleteKey = async (keyName: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/settings/keys/${keyName.split(" ").join("-")}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleting key: ", error);
    return null;
  }
};

export const getRecentUsers = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/users`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting recent members: ", error);
    return null;
  }
}

export const getKeys = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/settings/keys`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting keys: ", error);
    return null;
  }
}

export const banUser = async (userId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/ban/${userId}`,
      {},
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in banning this user: ", error);
    return null;
  }
}

export const unbanUser = async (userId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/unban/${userId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in unbanning this user: ", error);
    return null;
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const response = await axios.delete(
      `${API_URL}/user/${userId}`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in deleting this user: ", error);
    return null;
  }
}

export const getRecentBannedUsers = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/banned-users`,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error in getting recent kicks: ", error);
    return null;
  }
}

export const toggleFeature = async (featureId: string) => {
  try {
    const response = await axios.patch(
      `${API_URL}/feature/${featureId}`,
      {},
      {
        withCredentials: true,
      }
    );
    if (!response || response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error in toggling this feature: ", error);
    return null;
  }
};