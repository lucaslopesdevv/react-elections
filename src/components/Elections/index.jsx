import React from "react";

export default function Elections({
  children: elections,
  title = "Title padrão",
  totalComparecidos = "Total de Eleitores",
  totalAbstenções = "Total abs",
  totalEleitores = "total Eleitores",
  totalCandidatos = "total candidatos",
}) {
  return (
    <>
      <div className="border p-2 items-center text-center justify-center flex-wrap m-4">
        <span className="font-bold">{title}</span>
        <br />
        <h3 className="font-bold text-sm pr-12">{totalComparecidos}</h3>
        <h3 className="font-bold text-sm pr-12">{totalAbstenções}</h3>
        <h3 className="font-bold text-sm pr-12">{totalEleitores}</h3>
        <h3 className="font-bold text-sm pr-12">{totalCandidatos}</h3>

        <div className="p-2 flex flex-row items-center justify-center flex-wrap m-4">
          {elections}
        </div>
      </div>
    </>
  );
}
