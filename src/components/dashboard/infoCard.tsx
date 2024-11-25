function InfoCard() {
  return (
    <div className="sticky top-5">
      <div className=" p-[20px_24px] rounded-2xl mb-5 relative bg-gradient-to-t from-[--primary-color] to-indigo-600">
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2">
          {/* <img
            className=" object-contain opacity-20"
            src="/astronaut.png"
            alt=""
          /> */}
        </div>
        <div className="flex flex-col gap-6">
          <span className="font-bold text-lg text-white">🔥 Available Now</span>
          <h3 className=" text-gray-200 dark:text-foreground text-base">
            New Admin Dashboard Available
          </h3>
          <p className="text-muted dark:text-gray-200 text-base">
            {"Learn more about the new admin dashboard and how to use it."}
          </p>
          {/* <button className="flex p-[10px] items-center gap-[10px] w-max bg-[#5d57c9] shadow-sm hover:shadow-lg hover:brightness-110 text-white border-none rounded-[5px]">
            Ok
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
