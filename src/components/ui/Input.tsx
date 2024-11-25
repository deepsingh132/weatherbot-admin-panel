import React from "react";

function Input({
  type,
  value,
  name,
  id,
  placeholder,
  onChange,
}: {
  type: string;
  value: string | undefined;
  name: string;
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      value={value}
      name={name}
      onChange={onChange}
      id={id}
      className="inputBox block p-2 ps-10 text-sm focus:outline-none text-gray-900 border border-gray-300 rounded-lg md:min-w-[290px] max-w-[250px] bg-gray-50 focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
    />
  );
}

export default Input;
