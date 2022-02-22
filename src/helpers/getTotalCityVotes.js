import { cities, election, candidates } from "../backend/api";

export function getTotalCityVotes(queryCity) {
  if (queryCity) {
    const city = cities.filter((city) => {
      return city.id === queryCity;
    });

    console.log("total de votos presentes " + JSON.stringify(city));

    return city[0];
  }
  return;
}

export function getVotesByCandidate(city, candidate) {
  let totalCandidateVotes = 0;

  election.forEach((el) => {
    if (el.cityId === city && el.candidateId === candidate) {
      totalCandidateVotes += el.votes;
    }
  });
  console.log("cidade teste", city);
  return totalCandidateVotes;
}

export function getCandidate(id) {
  return candidates.filter((candidate) => {
    return candidate.id === id;
  });
}

export function getCandidatesByCity(cityId) {
  let candidatesOfCity = [];

  election.forEach((el, index) => {
    if (el.cityId === cityId) {
      let candidate = getCandidate(el.candidateId)[0];
      candidatesOfCity.push({
        candidate: candidate,
        votes: getVotesByCandidate(cityId, candidate.id),
      });
    }
  });

  let sorted = candidatesOfCity.sort((a, b) => {
    return a.votes > b.votes ? -1 : 1;
  });

  return sorted;
}
