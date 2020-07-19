import axios from "axios";
import { API_URL } from "./constants"

export const fetchSettings = () => (
  axios.get(`${API_URL}/game-settings`)
    .then((response) => response.data))


export const fetchWinners = () => (
  axios.get(`${API_URL}/winners`)
    .then((res) => res.data)
);

export const postWinner = (winner, date) => (
  axios.post(`${API_URL}/winners/`, {
      winner,
      date,
    })
);
