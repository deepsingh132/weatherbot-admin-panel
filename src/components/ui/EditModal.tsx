import { useState } from "react";
import Input from "./Input";
import { useModalContext } from "@/context/globalContext";
import { editKey } from "@/utils/apiRequests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const EditModal = ({ name }: { name: string }) => {
  const { toggleModal } = useModalContext();
  const [newKeyValue, setNewKeyValue] = useState("");
   const navigate = useNavigate();

  const handleEdit = async (name: string, value: string) => {
    const result = await editKey(name.toLowerCase(), value);
    if (!result) {
      toggleModal();
      toast.error("Error editing key");
      return false;
    }

    toggleModal();
    toast.success("Key edited successfully");
    navigate(0);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:p-4 items-center justify-center">
        <div className="flex items-center justify-center">
        <h1 className="text-lg font-bold mb-4">
          Are you sure you want to edit this key? (This action cannot be undone!)
          </h1>
          </div>
        <Input
          type="text"
          value={newKeyValue}
          name="key"
          id="key"
          placeholder="Enter key"
          onChange={(e) => setNewKeyValue(e.target.value)}
        />
        <div className="flex items-center justify-center mt-4 gap-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => await handleEdit(name, newKeyValue)}
        >
          Edit
        </button>{" "}
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          {" "}
          Cancel
          </button>
          </div>
      </div>
    </div>
  );
};
