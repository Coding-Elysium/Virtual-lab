import {
  Box,
  Breadcrumbs,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Paper,
  Divider,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../helper/helper";
import { Link, useParams } from "react-router-dom";

const StudentProfile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
  const [examRecords, setExamRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch student data
  useEffect(() => {
    axios
      .get(`${endPoint}/student/read/${studentId}`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  useEffect(() => {
    axios
      .get(`${endPoint}/coc/cocone/${studentId}`)
      .then((response) => {
        setExamRecords(response.data);
        console.log("COC Records:", response.data);
        console.log("Exam Records:", examRecords.exams.cocOne);
      })
      .catch((error) => {
        console.error("Error fetching COC records:", error);
      });
  }, [studentId]);

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
      <Breadcrumbs sx={{ mb: 2 }}>
        <Typography color="text.secondary">Student</Typography>
        <Typography color="text.secondary">Student Review</Typography>
        <Typography color="text.primary">Student Profile</Typography>
      </Breadcrumbs>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Paper elevation={3} sx={{ p: 4, mt: 3, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {studentData?.firstName} {studentData?.lastName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              <strong>LRN:</strong> {studentData?.lrn}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {studentData?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {studentData?.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Grade Level:</strong> {studentData?.gradeLevel}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            Records
          </Typography>

          {examRecords?.exams?.cocOne && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6">COC One</Typography>
                <Typography variant="body2">
                  <strong>Type:</strong> {examRecords.exams.cocOne.typeFood}
                </Typography>
                <Typography variant="body2">
                  <strong>Category:</strong> {examRecords.exams.cocOne.category}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                  {examRecords.exams.cocOne.stages.map((stage, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {stage.name}
                          </Typography>
                          <Typography variant="body2">
                            {stage.description}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Status:</strong> {stage.status}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            <strong>Recipe:</strong>{" "}
                            {stage.recipe && stage.recipe.join(", ")}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </Box>
  );
};

export default StudentProfile;
