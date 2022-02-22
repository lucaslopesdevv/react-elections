import React from "react";

export default function Main({ children }) {
  return (
    <main className="text-center container mx-auto p-4">
      <p> Escolha o Muncípio </p>
      {children}
    </main>
  );
}
