import React from "react";

export default function Election({ children: election }) {
  return (
    <div
      className="shadow-lg p-4 m-2 w-64 h-50 cursor-pointer
    flex flex-row items-center justify-center 
    font-semibold text-center"
    >
      {election}
    </div>
  );
}
