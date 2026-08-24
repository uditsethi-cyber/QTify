import { Box, Card, CardContent, CardMedia, Chip } from "@mui/material";

const MusicCard = ({ album }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        fontWeight: "400 !important",
        rowGap: 0.5,
        display: "flex",
        flexDirection: "column",
        width: "10rem",
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          sx={{ height: 170 }}
          image={album?.image}
          title={album?.title}
          alt={album?.title}
          loading="lazy"
        />
        <CardContent>
          <Chip
            label={`${album?.follows || album?.likes || 0} ${album?.likes ? "likes" : "follows"}`}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
            }}
          />
        </CardContent>
      </Card>
      <span>{album?.title}</span>
    </Box>
  );
};

export default MusicCard;
