import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardMedia,
  Divider,
  Modal,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
  Grid,
} from "@mui/material";

const initialScores = {
  dimension: {
    useTools: 0,
    procedure: 0,
    safety: 0,
    product: 0,
    timeManagement: 0,
    totalScore: 0,
  },
  criteria: {
    properBalance: 0,
    useOfColor: 0,
    shape: 0,
    useOfGarnish: 0,
    overallPresentation: 0,
    totalScore: 0,
  },
};

const CocOne = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [open, setOpen] = useState(false);
  const [selectedCoc, setSelectedCoc] = useState(null);
  const [scores, setScores] = useState(initialScores);

  // Your sample data (1 real, 2 missing image)
  const cocDataRaw = [
    {
      imageFood:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359824/dessert_jlfn7h.png",
      typeOfExam: "coc2",
      category: "Appetizer",
      ingredients: [
        "Tomato sauce",
        "Ground beef",
        "Mozzarella cheese",
        "Lasagna noodles",
      ],
      tools: [
        { name: "Oven", usage: "Used to bake the lasagna" },
        { name: "Spatula", usage: "Used to serve portions" },
      ],
      procedure: [
        "Preheat the oven to 375°F",
        "Layer noodles, sauce, and cheese",
        "Bake for 45 minutes",
      ],
      isWellCooked: true,
      time: {
        start: "2025-06-22T10:00:00.000Z",
        end: "2025-06-22T11:00:00.000Z",
      },
      status: "Pending",
      score: 18,
    },
    {
      imageFood:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359824/dessert_jlfn7h.png",
      typeOfExam: "coc2",
      category: "Appetizer",
      ingredients: [
        "Tomato sauce",
        "Ground beef",
        "Mozzarella cheese",
        "Lasagna noodles",
      ],
      tools: [
        { name: "Oven", usage: "Used to bake the lasagna" },
        { name: "Spatula", usage: "Used to serve portions" },
      ],
      procedure: [
        "Preheat the oven to 375°F",
        "Layer noodles, sauce, and cheese",
        "Bake for 45 minutes",
      ],
      isWellCooked: true,
      time: {
        start: "2025-06-22T10:00:00.000Z",
        end: "2025-06-22T11:00:00.000Z",
      },
      status: "Pending",
      score: 18,
    },
  ];

  // Default filler if less than 3
  const defaultCocItem = {
    imageFood: null,
    typeOfExam: "coc2",
    category: "N/A",
    ingredients: [],
    tools: [],
    procedure: [],
    isWellCooked: false,
    time: {
      start: new Date().toISOString(),
      end: new Date().toISOString(),
    },
    status: "Pending",
    score: 0,
  };

  const cocData = [
    ...cocDataRaw,
    ...Array(Math.max(0, 3 - cocDataRaw.length)).fill(defaultCocItem),
  ];

  const handleOpen = (item) => {
    setSelectedCoc(item);
    setScores(initialScores);
    setOpen(true);
  };

  const handleInputChange = (section, key, value) => {
    const updated = {
      ...scores,
      [section]: {
        ...scores[section],
        [key]: parseInt(value) || 0,
      },
    };
    const total = Object.entries(updated[section])
      .filter(([k]) => k !== "totalScore")
      .reduce((sum, [, val]) => sum + val, 0);
    updated[section].totalScore = total;
    setScores(updated);
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        pl: isSmallScreen ? 2 : 6,
        pr: isSmallScreen ? 2 : 6,
        pt: 4,
      }}
    >
      <Typography variant="h5" mb={2}>
        Records
      </Typography>

      <Grid container spacing={3}>
        {cocData.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                overflow: "hidden",
                cursor: item.imageFood ? "pointer" : "not-allowed",
                opacity: item.imageFood ? 1 : 0.6,
              }}
              onClick={() => {
                if (item.imageFood) handleOpen(item);
              }}
            >
              <Typography variant="subtitle1" sx={{ p: 2 }}>
                {item.category}
              </Typography>

              {item.imageFood ? (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageFood}
                  alt="Food Output"
                  sx={{ objectFit: "cover", bgcolor: "#f5f5f5" }}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    width: 330,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                    color: "gray",
                    fontSize: "1rem",
                    fontStyle: "italic",
                  }}
                >
                  Not taking
                </Box>
              )}

              <Divider />

              <Box sx={{ p: 2 }}>
                <Typography variant="body2" fontWeight="bold">
                  Status:{" "}
                  <Box component="span" sx={{ color: "#999" }}>
                    {item.status}
                  </Box>
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 3,
            p: 4,
            maxWidth: 750,
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {selectedCoc && (
            <>
              <Typography variant="h6" mb={2}>
                Evaluate {selectedCoc.category}
              </Typography>

              {selectedCoc.imageFood ? (
                <img
                  src={selectedCoc.imageFood}
                  alt="Food"
                  style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
                />
              ) : (
                <Box
                  sx={{
                    height: 200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "#f5f5f5",
                    color: "gray",
                    fontSize: "1rem",
                    fontStyle: "italic",
                    borderRadius: 2,
                    mb: 2,
                  }}
                >
                  No Image
                </Box>
              )}

              <Typography variant="body1" fontWeight="bold">
                Ingredients
              </Typography>
              <List dense>
                {selectedCoc.ingredients.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body1" fontWeight="bold" mt={2}>
                Tools
              </Typography>
              <List dense>
                {selectedCoc.tools.map((tool, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={tool.name} secondary={tool.usage} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="body1" fontWeight="bold" mt={2}>
                Procedure
              </Typography>
              <List dense>
                {selectedCoc.procedure.map((step, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText primary={`${i + 1}. ${step}`} />
                  </ListItem>
                ))}
              </List>

              <Typography mt={2}>
                <strong>Cooked Well:</strong>{" "}
                {selectedCoc.isWellCooked ? "Yes" : "No"}
              </Typography>
              <Typography>
                <strong>Start:</strong>{" "}
                {new Date(selectedCoc.time.start).toLocaleTimeString()} {" | "}
                <strong>End:</strong>{" "}
                {new Date(selectedCoc.time.end).toLocaleTimeString()}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="subtitle1" gutterBottom>
                Dimension Scoring
              </Typography>
              <Stack spacing={1} mb={2}>
                {Object.keys(scores.dimension)
                  .filter((k) => k !== "totalScore")
                  .map((key) => (
                    <TextField
                      key={key}
                      label={key}
                      type="number"
                      inputProps={{ min: 0, max: 5 }}
                      value={scores.dimension[key]}
                      onChange={(e) =>
                        handleInputChange("dimension", key, e.target.value)
                      }
                      fullWidth
                    />
                  ))}
                <Typography fontWeight="bold">
                  Total: {scores.dimension.totalScore}
                </Typography>
              </Stack>

              <Typography variant="subtitle1" gutterBottom>
                Criteria Scoring
              </Typography>
              <Stack spacing={1} mb={2}>
                {Object.keys(scores.criteria)
                  .filter((k) => k !== "totalScore")
                  .map((key) => (
                    <TextField
                      key={key}
                      label={key}
                      type="number"
                      inputProps={{ min: 0, max: 5 }}
                      value={scores.criteria[key]}
                      onChange={(e) =>
                        handleInputChange("criteria", key, e.target.value)
                      }
                      fullWidth
                    />
                  ))}
                <Typography fontWeight="bold">
                  Total: {scores.criteria.totalScore}
                </Typography>
              </Stack>

              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  console.log("Submitted Scores:", scores);
                  setOpen(false);
                }}
              >
                Submit Evaluation
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default CocOne;
