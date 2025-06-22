import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Breadcrumbs,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endPoint } from "../helper/helper";
import COCCard from "../components/COCCard";

const StudentProfile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { studentId } = useParams();
  const [studentData, setStudentData] = useState(null);
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

  const navigate = useNavigate();

  const handleClickCOC1 = () => {
    navigate(`/dashboard/cocone`);
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

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box
              sx={{
                flex: "1 1 100%",
                maxWidth: { xs: "100%", sm: "calc(33.33% - 16px)" },
              }}
            >
              <COCCard title={"COC 1"} onClick={handleClickCOC1} />
            </Box>
            <Box
              sx={{
                flex: "1 1 100%",
                maxWidth: { xs: "100%", sm: "calc(33.33% - 16px)" },
              }}
            >
              <COCCard
                title={"COC 2"}
                image="https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/soup_mbvceo.png"
              />
            </Box>
            <Box
              sx={{
                flex: "1 1 100%",
                maxWidth: { xs: "100%", sm: "calc(33.33% - 16px)" },
              }}
            >
              <COCCard
                title={"COC 3"}
                image="https://res.cloudinary.com/dhceioavi/image/upload/v1749359823/appetizer_mgjyom.png"
              />
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default StudentProfile;
