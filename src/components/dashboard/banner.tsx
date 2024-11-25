import { Bot } from "lucide-react";
import { Card } from "../ui/card";
import bannerBg from "@/assets/banner-bg.png";

import { link } from "../../config/inviteLink.json";

function Banner() {
  const handleOpen = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[220px] bg-[#2481cc] rounded-2xl overflow-hidden">
      {/* Background Image */}
      {/* <img
        src={bannerBg}
        alt="Banner Background"
        className="absolute max-w-[800px] right-0 object-cover w-full h-full"
      /> */}

      {/* Card with Text Content */}
      <Card className="relative flex-1 bg-transparent border-none rounded-2xl w-full h-full overflow-hidden">
        <div className="flex flex-col md:p-8 p-4 w-full justify-between h-full">
          <div>
            <h1 className="text-4xl font-bold text-white">Getting Started</h1>
            <p className="text-sm text-gray-300 mt-2">
              Learn how to use Weather Bot Admin Panel
            </p>
          </div>
          <div>
            <button
              onClick={() => handleOpen()}
              className="p-3 flex justify-center items-center rounded-2xl shadow-sm hover:shadow-lg ease-in transition-all duration-200 font-semibold text-white bg-[rgba(255,255,255,0.2)]"
            >
              <Bot size={20} />
              <h1 className="ml-2 text-center">Chat with Bot</h1>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Banner;
