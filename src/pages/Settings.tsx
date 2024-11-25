import AuthService from "@/auth/AuthService";
import { Modal } from "@/components/modal/modal";
import { DeleteModal } from "@/components/ui/DeleteModal";
import { EditModal } from "@/components/ui/EditModal";
import Spinner from "@/components/ui/spinner";
import { useGlobalContext, useModalContext } from "@/context/globalContext";
import {  getKeys } from "@/utils/apiRequests";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface Key {
  name: string;
  value: string;
  createdAt: Date;
  createdBy: string;
}

interface action {
  type: 'edit' | 'delete';
}

function Settings() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState<Key[]>([]);
  const [isKeyVisible, setIsKeyVisible] = useState(false);
  const [keyToBeModified, setKeyToBeModified] = useState("");
  const [action, setAction] = useState<action>({ type: 'edit' });

  const { isModalOpen, toggleModal } = useModalContext();
  const { isSidebarOpen } = useGlobalContext();


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

  useEffect(() => {
    setLoading(true);
    const getSettings = async () => {
      try {
        const data = await getKeys();

        // Transform data into rows
      const transformedData: Key[] = [
        {
          name: "OpenWeather API Key",
          value: data.apiKey??"null",
          createdAt: new Date(data.createdAt),
          createdBy: data.createdBy,
        },
        {
          name: "Bot Token",
          value: data.botToken??"null",
          createdAt: new Date(data.createdAt),
          createdBy: data.createdBy,
        },
      ];

        // if any of the values are null, remove them
        // transformedData.forEach((item) => {
        //   if (item.value === "null") {
        //     transformedData.splice(transformedData.indexOf(item), 1);
        //   }
        // });

        setKey(transformedData);

        setLoading(false);
      } catch (error) {
        console.error("Error in getting settings: ", error);
        setLoading(false);
      }
    };
    getSettings();
  }, [currentUser]);

  useEffect(() => {
    const user = AuthService.getCurrentUser() as User;
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleModalOpen = (name: string, action: action) => {
    setKeyToBeModified(name);
    setAction(action);
    toggleModal();
  };

  if(loading){
    return <div className="h-screen flex justify-center items-center"><Spinner /></div>
  }


  return (
    <div className="flex rounded-lg border bg-white dark:bg-background border-gray-300 flex-col w-full h-full">
      <div className="title flex py-3 px-6 text-black w-full p-4 font-bold">
        <h1 className="text-xl leading-7 font-bold text-black dark:text-gray-200">Settings</h1>
      </div>
      <div className="md:flex md:flex-row flex flex-col p-6  w-full justify-around items-center">
        {/* <img
          src={``}
          alt="OpenWeather Logo"
          // className={`w-36 h-36 rounded-full`}
        /> */}
        <div className="api-keys-container overflow-auto mt-6 w-full">
          <table className="text-sm border-collapse  w-full">
            <thead className="text-xs font-medium text-left whitespace-nowrap first:pl-0 last:pr-0 text-gray-900 dark:text-gray-200">
              <tr>
                <th
                  scope="col"
                  style={{ width: "200px" }}
                  className="whitespace-nowrap md:w-[200px] min-w-[165px] py-[6px] pr-2 tracking-widest leading-4"
                >
                  NAME
                </th>
                <th
                  scope="col"
                  style={{ width: "25%" }}
                  className="whitespace-nowrap md:max-w-[200px] py-[6px] px-2 tracking-widest leading-4"
                >
                  VALUE
                </th>
                <th
                  scope="col"
                  // style={{ width: "25%" }}
                  className="whitespace-nowrap md:max-w-[200px] md:table-cell  hidden py-[6px] px-2 tracking-widest leading-4"
                >
                  CREATED AT
                </th>
                <th
                  scope="col"
                  style={{ width: "25%" }}
                  className={`whitespace-nowrap ${
                    isSidebarOpen ? "hidden xl:table-cell" : "md:table-cell hidden"
                  } hidden py-[6px] pl-2 tracking-widest leading-4`}
                >
                  CREATED BY
                </th>
              </tr>
            </thead>
            <tbody className="w-full border-gray-300">
              {key.map((key, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-primary">
                  <td
                    style={{ width: "200px" }}
                    className="border-t max-w-[200px] first:pl-0 last:pr-0 border-gray-200 px-2 py-2"
                  >
                    {key.name}
                  </td>
                  <td
                    onClick={() => setIsKeyVisible(!isKeyVisible)}
                    className="border-t lg:max-w-[200px] max-w-[100px] text-ellipsis cursor-pointer overflow-hidden border-gray-200 px-2 py-2"
                  >
                    {isKeyVisible
                      ? key.value
                      : key.value.substring(0, 5) +
                        "..." +
                        key.value.substring(key.value.length - 5)}
                  </td>
                  <td className="border-t md:table-cell hidden whitespace-nowrap border-gray-200 px-4 py-2">
                    {key.createdAt.toLocaleString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className={`border-t ${isSidebarOpen ? "hidden xl:table-cell" : "md:table-cell hidden"} max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap border-gray-200 px-2 py-2`}>
                    {key.createdBy}
                  </td>
                  <td className="border-t whitespace-nowrap border-gray-200 px-2 py-2 text-center">
                    <button
                      onClick={() =>
                        handleModalOpen(key.name, { type: "edit" })
                      }
                      className="text-white px-2 py-1 rounded hover:bg-gray-200 mr-2"
                    >
                      <span className="w-2 h-2 text-gray-600">
                        <Edit className="h-[18px] w-[18px]" />
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        handleModalOpen(key.name, { type: "delete" })
                      }
                      className="text-white px-2 py-1 rounded hover:bg-red-100"
                    >
                      <span className="text-red-600">
                        <Trash2 className="h-[18px] w-[18px]" />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && action.type === "edit" ? (
        <Modal closeModal={toggleModal}>
          <EditModal name={keyToBeModified} />
        </Modal>
      ) : (
        isModalOpen &&
        action.type === "delete" && (
          <Modal closeModal={toggleModal}>
            <DeleteModal name={keyToBeModified} />
          </Modal>
        )
      )}
    </div>
  );
}

export default Settings;
