import { Box, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./Section.module.css";
import MusicCard from "../MusicCard/MusicCard";
import Carousel from "../Carousel/Carousel";

const Section = ({
  title,
  albumData,
  id,
  showtabs,
  showall,
  genres,
  songs,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [filteredSongs, setFilteredSongs] = useState({
    All: songs,
  });
  const a11yProps = (index) => {
    return {
      id: `genre-${index}`,
      "aria-controls": `genre-${index}`,
    };
  };
  const handleTabChange = (event) => {
    const genreSelected = event?.target?.textContent;
    setSelectedGenre(event?.target?.textContent);

    if (filteredSongs?.[genreSelected]?.length) return;
    const filteredMusic = songs?.filter(
      (song) => song.genre?.label === genreSelected,
    );
    setFilteredSongs((prev) => ({
      ...prev,
      [genreSelected]: filteredMusic,
    }));
  };

  useEffect(() => {
    setFilteredSongs({
      All: songs,
    });
  }, [songs]);
  return (
    <Grid container size={12} className={styles.section} spacing={2}>
      <Grid className={styles["section-header"]}>
        <span>{title}</span>
        {showall && (
          <CustomButton handler={() => setIsCollapsed((prev) => !prev)}>
            {isCollapsed ? "Show all" : "Collapse"}
          </CustomButton>
        )}
      </Grid>
      {showtabs && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={selectedGenre}
              onChange={handleTabChange}
              aria-label="genre tab"
              sx={{
                "& .MuiTab-root": {
                  color: "#FFFFFF",
                },
                "& .MuiTab-root.Mui-selected": {
                  color: "#FFFFFF",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "var(--color-primary)",
                },
              }}
            >
              <Tab label={"All"} {...a11yProps(0)} value={"All"} />
              {genres?.map((genre, index) => {
                return (
                  <Tab
                    label={genre?.label}
                    {...a11yProps(index + 1)}
                    value={genre?.label}
                  />
                );
              })}
            </Tabs>
          </Box>
          <Carousel albumData={filteredSongs?.[selectedGenre]} id={id} />
        </>
      )}
      {!showtabs &&
        (isCollapsed ? (
          <Carousel albumData={albumData} id={id} />
        ) : (
          albumData?.map((album) => (
            <Grid item key={album?.id} size={{ xs: 1.7 }}>
              <MusicCard album={album} />
            </Grid>
          ))
        ))}
    </Grid>
  );
};

export default Section;
