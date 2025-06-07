import {
  Box,
  Breadcrumbs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { endPoint } from "../helper/helper";
import { useParams } from "react-router-dom";

const StudentProfile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);

  console.log("Student ID from params:", studentId);

  useEffect(() => {
    axios
      .get(`${endPoint}/student/read/${studentId}`)
      .then((response) => {
        console.log("Fetched student data:", response.data);
        setStudentData(response.data);
        console.log("Student data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [studentId]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100%, 1fr))",
        gap: 4,
        pl: isSmallScreen ? 0 : 6,
        pr: isSmallScreen ? 0 : 6,
      }}
    >
      <Breadcrumbs>
        <Typography color="text.secondary">Student</Typography>
        <Typography color="text.primary">Student Review</Typography>
      </Breadcrumbs>

      <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
        {studentData ? studentData.firstName : "Loading..."}
      </Typography>
    </Box>
  );
};

export default StudentProfile;
