import { useEffect, useState, lazy, Suspense } from "react";
import "./App.css";
// lazy-load non-critical UI to reduce initial bundle
const Hero = lazy(() => import("./components/Hero/Hero"));
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
const Section = lazy(() => import("./components/Section/Section"));
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
      <Suspense fallback={<div />}>
        <Hero />
      </Suspense>

      <Box
        sx={{
          gap: "2rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--color-black)",
        }}
      >
        <Suspense fallback={<div />}>
          <Section
            title={"Top Albums"}
            albumData={albumData}
            id={"topalb"}
            showall
          />
        </Suspense>
        <Suspense fallback={<div />}>
          <Section
            title={"New Albums"}
            albumData={newAlbumData}
            id={"newalb"}
            showall
          />
        </Suspense>
        <Suspense fallback={<div />}>
          <Section
            title={"Songs"}
            albumData={newAlbumData}
            id={"songs"}
            showtabs
            genres={genres}
            songs={songs}
          />
        </Suspense>
      </Box>
    </div>
  );
}

export default App;
