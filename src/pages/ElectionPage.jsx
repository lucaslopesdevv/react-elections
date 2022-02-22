import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import { cities } from "../backend/api";
import Election from "../components/Election";
import Elections from "../components/Elections";
import {
  getCandidatesByCity,
  getTotalCityVotes,
} from "../helpers/getTotalCityVotes";

export default function ElectionPage() {
  const [allMunicipios] = useState(cities);
  const [candidatesOfCity, setCandidatesOfCity] = useState([]);
  const [cityState, setCityState] = useState("");

  let optionName = "";

  useEffect(() => {
    let city = document.getElementById("selectMunicipio").value;
    console.log("Effect " + city);
    setCandidatesOfCity(getCandidatesByCity(city));
    setCityState(city);
  }, [cityState]);

  function handleCity(cityId) {
    setCityState(cityId);
    setCandidatesOfCity(getCandidatesByCity(cityId));
  }

  function getCityName(cityId) {
    allMunicipios.map(({ id, name }) => {
      if (id === cityId) {
        optionName = name;
      }
      return optionName;
    });
    return optionName;
  }

  return (
    <>
      <Header>react-elections</Header>
      <Main>
        <select
          className="bg-gray-200 p-2 m-1 rounded-md"
          name="selectMunicipio"
          id="selectMunicipio"
          onChange={(e) => {
            handleCity(e.target.value);
          }}
        >
          {allMunicipios.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </Main>

      <Elections
        title={"Eleição em " + getCityName(cityState)}
        totalComparecidos={
          "Total comparecidos: " +
          getTotalCityVotes(cityState)?.presence.toLocaleString("pt")
        }
        totalAbstenções={
          "Total Abastenções: " +
          getTotalCityVotes(cityState)?.absence.toLocaleString("pt")
        }
        totalEleitores={
          "Total Eleitores: " +
          getTotalCityVotes(cityState)?.votingPopulation.toLocaleString("pt")
        }
        totalCandidatos={"Total Candidatos: " + candidatesOfCity.length}
      >
        {console.log(
          "candidatos da cidade " + JSON.stringify(candidatesOfCity)
        )}
        {candidatesOfCity.map(({ candidate, votes }, index) => {
          return (
            <Election key={candidate.username}>
              <div className="grid grid-rows">
                <img
                  className="rounded-full box-content mr-3 h-20 w-20 p-2 border-4 "
                  src={`/img/${candidate.username}.png`}
                  alt="Nao encontrada"
                />
                <span className="row-span-1">{candidate.name}</span>
                <span
                  className={index === 0 ? "bg-green-700" : "bg-yellow-700"}
                >
                  {(
                    (parseInt(votes) /
                      parseInt(getTotalCityVotes(cityState).presence)) *
                    100
                  )
                    .toFixed(2, 10)
                    .toLocaleString("pt") + "%"}
                </span>
                <span className="row-span-1">
                  Votos : {votes?.toLocaleString("pt")}
                </span>
                <span
                  className={index === 0 ? "bg-green-600" : "bg-yellow-500"}
                >
                  {index === 0 ? "Eleito" : " Não Eleito"}
                </span>
              </div>
            </Election>
          );
        })}
      </Elections>
    </>
  );
}
