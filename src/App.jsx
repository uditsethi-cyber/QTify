import { useEffect, useState } from "react";
import "./App.css";
import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import Section from "./components/Section/Section";
import APIURL from "./constants/APIURL";
import { Box } from "@mui/material";

function App() {
  const [albumData, setAlbumData] = useState([]);
  const [newAlbumData, setNewAlbumData] = useState([]);
  const [songs, setSongs] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchTopAlbumData = async () => {
    try {
      const apiUrl = APIURL?.TOP_ALBUM;
      const response = await axios?.get(apiUrl);
      return response?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const fetchNewAlbumData = async () => {
    try {
      const apiUrl = APIURL?.NEW_ALBUM;
      const response = await axios?.get(apiUrl);
      return response?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const fetchMusicData = async () => {
    try {
      const apiUrl = APIURL?.SONGS;
      const response = await axios?.get(apiUrl);
      return response?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const fetchGenresData = async () => {
    try {
      const apiUrl = APIURL?.GENRES;
      const response = await axios?.get(apiUrl);
      return response?.data?.data || [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const loadInitialData = async () => {
    const [albumDataRes, newAlbumDataRes, musicDataRes, genresDataRes] =
      await Promise.all([
        fetchTopAlbumData(),
        fetchNewAlbumData(),
        fetchMusicData(),
        fetchGenresData(),
      ]);
    setAlbumData(albumDataRes);
    setNewAlbumData(newAlbumDataRes);
    setSongs(musicDataRes);
    setGenres(genresDataRes);
  };
  useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <div className="app">
      <Navbar searchData={""} />
      <Hero />
      <Box
        sx={{
          gap: "2rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--color-black)",
        }}
      >
        <Section
          title={"Top Albums"}
          albumData={albumData}
          id={"topalb"}
          showall
        />
        <Section
          title={"New Albums"}
          albumData={newAlbumData}
          id={"newalb"}
          showall
        />
        <Section
          title={"Songs"}
          albumData={newAlbumData}
          id={"songs"}
          showtabs
          genres={genres}
          songs={songs}
        />
      </Box>
    </div>
  );
}

export default App;
