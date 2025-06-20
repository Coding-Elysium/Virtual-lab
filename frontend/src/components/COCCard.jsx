import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

const COCCard = ({ title, image, status, date, onClick }) => (
  <Card
    variant="outlined"
    sx={{
      width: "100%",
      height: "100%",
      borderRadius: 3,
      transition: "transform 0.2s",
      cursor: "pointer",
      "&:hover": {
        transform: "scale(1.02)",
        boxShadow: 3,
      },
    }}
    onClick={onClick}
  >
    <CardHeader
      title={title || "Untitled Record"}
      sx={{ textAlign: "start", fontWeight: "bold" }}
    />
    <Divider />
    <CardContent>
      <Box
        sx={{
          width: "100%",
          height: 180,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          color: "#999",
          fontStyle: "italic",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="COC"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          "No Image"
        )}
      </Box>
      <Typography variant="body2" color="text.secondary">
        <strong>Status:</strong> {status || "Pending"}
      </Typography>
      {date && (
        <Typography variant="body2" color="text.secondary">
          <strong>Date:</strong> {new Date(date).toLocaleDateString()}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export default COCCard;
