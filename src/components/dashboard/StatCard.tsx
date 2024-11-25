import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import iconMap from "@/utils/getIcon";
import socketIOClient from "socket.io-client";
import { useGlobalContext } from "@/context/globalContext";
import Spinner from "../ui/spinner";

function StatCard({ stats }: { stats: Stats }) {
  const [uptime, setUptime] = useState(0);
  const [botStatus, setBotStatus] = useState('Running');
  const [fetching, setFetching] = useState(false);
  const [latencies, setLatencies] = useState({ botLatency: 0, apiLatency: 0 });

  const { isSidebarOpen } = useGlobalContext();

  useEffect(() => {
    setFetching(true);
    const socket = socketIOClient(import.meta.env.VITE_BACKEND_URL, {
      transports: ["websocket"],
      upgrade: true,
      // autoConnect: true,
      timeout: 5000,
    }); // Connect to the server

    socket.on("uptime", (uptimeInSeconds) => {
      setUptime(uptimeInSeconds);
      setFetching(false);
    });

    socket.on("latencies", (latencies) => {
      setLatencies(latencies);
      setFetching(false);
    });

    socket.on("botStatus", (status) => {
      setBotStatus(status);
      setFetching(false);
    });

    socket.on("disconnect", () => {
      setFetching(false);
    });

    setFetching(false);


    return () => {
      setFetching(false);
      socket.disconnect();
    };
  }, []);

  // Convert uptime (in seconds) to a readable format
  const formatUptime = (uptimeInSeconds: number | undefined) => {
    if (!uptimeInSeconds) return "0s";

    const days = Math.floor(uptimeInSeconds / (3600 * 24));
    const hours = Math.floor((uptimeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = uptimeInSeconds % 60;

    let formattedUptime = "";
    if (days > 0) formattedUptime += `${days}d `;
    if (hours > 0) formattedUptime += `${hours}h `;
    if (minutes > 0) formattedUptime += `${minutes}m `;
    formattedUptime += `${seconds}s`;

    return formattedUptime;
  };

  const IconComponent = iconMap[stats.icon ? stats.icon : "BotMessageSquare"];

  return (
    <Card
      className={` md:w-auto min-w-[150px] w-[80vw] ${
        isSidebarOpen ? "w-auto lg:min-w-[200px]" : "lg:w-[280px]"
      }`}
    >
      <div className="flex flex-col items-center">
        <CardHeader>
          <CardTitle>
            <span className="text-lg font-bold">{stats.title}</span>
            <div className="flex justify-center items-center mt-2">
              {IconComponent && <IconComponent className="md:h-8 md:w-8" />}
            </div>
          </CardTitle>
        </CardHeader>
        {/* <CardDescription>
          {stats.description}
        </CardDescription> */}

        {fetching && (
          <Spinner />
        )}

        { !fetching && (
        <CardContent>
          <span className="text-2xl max-w-[150px] inline-block text-ellipsis overflow-hidden font-bold whitespace-nowrap">
            {stats.title === "Uptime" && formatUptime(uptime)}
            {stats.title === "Bot Latency" &&
              `${latencies.botLatency}ms
            `}
            {stats.title === "Bot Status" &&
                stats?.stringData === "Online" &&
                (
                <div className={`z-10 flex items-center justify-center w-6 h-6 ${botStatus === 'Not Running' ? 'bg-red-200' : 'bg-green-200'} rounded-full ring-0 ring-white  shrink-0`}>
                  <span className={`flex w-3 h-3 animate-pulse ${botStatus === 'Not Running'  ? 'bg-red-600' : 'bg-green-600'} rounded-full`}></span>
                </div>
              )}
            {stats.title === "Bot Version" && stats?.stringData === "1.0.0" && (
              <span className="">{"v" + stats?.stringData}</span>
            )}
            {stats.title === "Bot Activity" &&
              stats?.stringData === "" &&
              // a dynamic graphic to be added here
              ""}
            {stats.title === "Errors Encountered" &&
              stats?.data === 0 &&
              // a dynamic graphic to be added here
              ""}
          </span>
          </CardContent>
        )}
      </div>
    </Card>
  );
}

export default StatCard;
