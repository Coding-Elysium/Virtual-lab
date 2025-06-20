import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@mui/material";
import axios from "axios";
import { endPoint } from "../helper/helper";

const COCDetail = () => {
  const { studentId, cocNumber } = useParams();
  const navigate = useNavigate();
  const [examRecords, setExamRecords] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${endPoint}/coc/cocone/${studentId}`)
      .then((response) => {
        setExamRecords(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching COC records:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const cocData = examRecords?.exams?.cocOne;

  if (!cocData) {
    return (
      <Box p={3}>
        <Typography variant="h6">No COC data available.</Typography>
      </Box>
    );
  }

  const handleCardClick = (stage) => {
    alert(`You clicked on: ${stage.name}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Stages
      </Typography>
      <Grid container spacing={2}>
        {cocData.stages?.map((stage, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Box width="100%">
              <Card variant="outlined" sx={{ width: "100%", height: "100%" }}>
                <CardActionArea onClick={() => handleCardClick(stage)}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {stage.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Description:</strong> {stage.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Recipe:</strong> {stage.recipe}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Status:</strong> {stage.status}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default COCDetail;
