import { useModalContext } from "@/context/globalContext";
import { deleteKey } from "@/utils/apiRequests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({ name }: { name: string }) => {

  const { toggleModal } = useModalContext();
  const navigate = useNavigate();

  const handleDelete = async (name: string) => {
    const result = await deleteKey(name.toLowerCase());
    if (!result) {
      toggleModal();
      toast.error("Error deleting key");
      return;
    }

    toggleModal();
    toast.success("Key deleted successfully");
    navigate(0);
  };

  return (
    <div>
      <div className="flex md:p-4 flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">
          Are you sure you want to delete this key?
        </h1>
        <span className="text-2xl font-bold mb-4">{name}</span>
        <div className="flex items-center justify-center gap-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(name)}
        >
          Delete
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
