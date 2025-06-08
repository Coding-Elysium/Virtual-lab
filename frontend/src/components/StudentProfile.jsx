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
  CardMedia,
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
  const [loading, setLoading] = useState(true);

  const examRecords = [
    {
      id: 1,
      title: "COC 1",
      status: "Passed",
      date: "2025-05-20",
      image:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/appetizer_mgjyom.png",
    },
    {
      id: 2,
      title: "COC 2",
      status: "Failed",
      date: "2025-04-15",
      image:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/appetizer_mgjyom.png",
    },
    {
      id: 2,
      title: "COC 3",
      status: "Pending",
      date: "2025-04-15",
      image:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/appetizer_mgjyom.png",
    },
    {
      id: 2,
      title: "COC 3",
      status: "Pending",
      date: "2025-04-15",
      image:
        "https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/appetizer_mgjyom.png",
    },
  ];

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
              {studentData.firstName} {studentData.lastName}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              <strong>LRN:</strong> {studentData.lrn}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {studentData.email}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {studentData.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Grade Level:</strong> {studentData.gradeLevel}
            </Typography>
          </Paper>

          <Typography variant="h5" sx={{ mt: 6, mb: 2 }}>
            Records
          </Typography>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            {examRecords.map((exam, index) => (
              <Grid item xs={12} sm={6} md={4} key={`${exam.id}-${index}`}>
                <Link to={`/dashboard/coc1`} style={{ textDecoration: "none" }}>
                  <Card
                    elevation={4}
                    sx={{ borderRadius: 3, cursor: "pointer" }}
                  >
                    <Box
                      sx={{
                        height: 200,
                        width: "100%",
                        backgroundImage: `url(${exam.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {exam.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          fontWeight: 600,
                          color:
                            exam.status === "Passed"
                              ? "green"
                              : exam.status === "Failed"
                                ? "error.main"
                                : "orange",
                        }}
                      >
                        {exam.status}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.5 }}
                      >
                        Date: {exam.date}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default StudentProfile;
