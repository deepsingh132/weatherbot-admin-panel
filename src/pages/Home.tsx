import Banner from "@/components/dashboard/banner";
import { useEffect, useState } from "react";
import { useGlobalContext, useModalContext, useUserContext } from "@/context/globalContext";
import stats from "../config/stats.json";
import StatCard from "@/components/dashboard/StatCard";
import InfoCard from "@/components/dashboard/infoCard";
import Table from "@/components/dashboard/Table";
import { getRecentUsers } from "@/utils/apiRequests";
import { SunMoon } from "lucide-react";
import { Modal } from "@/components/modal/modal";
import ToggleMode from "@/components/ui/toggleMode";
// import BasicSparkLineCustomization from "@/components/dashboard/Chart";

type Data = {
  _id: string;
  name: string;
  chatId: string;
  isBanned: boolean;
  lastAccess: Date;
  createdAt: Date;
  avatar: string | null;
};

function Home() {
  const { user } = useUserContext();
  const { isSidebarOpen } = useGlobalContext();
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [reFetch, setReFetch] = useState(false);
  const { isModalOpen, toggleModal } = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      setFetching(true);
      try {
        const responseData: Data[] = await getRecentUsers();
        setData(responseData || []);
      } catch (error) {
        console.error("Failed to fetch data: ", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [reFetch]);

  return (
    <main
      className={`flex pb-4 ${
        isSidebarOpen ? "sm:mx-1" : "sm:mx-4"
      } lg:mx-4 flex-col`}
    >
      <Banner />
      <div className="flex flex-col justify-center w-full mt-10 h-full">
        <div className="flex whitespace-nowrap max-w-screen-lg items-center justify-between w-full">
        <h1 className="font-bold text-3xl">Welcome, {user?.username}!</h1>

        <div className="dark-mode-switch flex items-center justify-end">
          <div
            onClick={() => toggleModal()}
            className="dark-mode cursor-pointer hover:bg-gray-200 dark:hover:bg-primary p-2 rounded"
          >
            <SunMoon />
          </div>
          </div>
          </div>

        <div className="flex md:gap-[20px] w-full">
          <div className="layout md:gap-[20px] max-w-screen-lg flex flex-col  justify-between w-full mt-10 h-full">
            <div className="md:flex md:flex-row flex flex-col gap-5 justify-between items-center">
              {stats.map((stat: Stats) => (
                <StatCard key={stat.title} stats={stat} />
              ))}
            </div>
            <div className="mt-10">
              <Table
                type="recent-users"
                data={data.filter((user) => !user.isBanned)}
                isFetching={fetching}
                reFetch={reFetch}
                setReFetch={setReFetch}
              />
            </div>

            <div className="mt-10">
              <Table
                type="recent-banned-users"
                data={data.filter((user) => user.isBanned)}
                isFetching={fetching}
                reFetch={reFetch}
                setReFetch={setReFetch}
              />
            </div>

            {/* <BasicSparkLineCustomization /> */}
          </div>
          <div
            className={`flex-1 mt-10 transition-all ${
              isSidebarOpen ? "w-0" : "xl:inline w-auto"
            } hidden`}
          >
            <InfoCard />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal closeModal={toggleModal}>
          <div className="sm:w-[400px] overflow-x-hidden w-[75vw] p-4">
            <h1 className=" text-3xl font-bold pb-2">Settings</h1>
            <ToggleMode />
          </div>
        </Modal>
      )}
    </main>
  );
}

export default Home;
