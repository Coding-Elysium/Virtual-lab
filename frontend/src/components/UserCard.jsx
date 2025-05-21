import { Box, Typography, Avatar, Button, Stack } from "@mui/material";
import React from "react";

const UserCardStyled = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: "white",
        borderRadius: 1,
        padding: 2,
        gap: 2,
        border: "1px solid grey",
      }}
    >
      <Avatar alt="Alex Morrison" sx={{ width: 80, height: 80 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary">
          Alex Morrison
        </Typography>
        <Typography variant="body2" color="grey">
          Senior Journalist
        </Typography>
        <Stack direction="row" spacing={1} mt={1}>
          <Box
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.5,
              fontSize: "0.8125rem", // matches MUI small button text size
              color: "text.primary",
              border: "1px solid",
              borderColor: "grey.500",
              borderRadius: "4px", // same as MUI default
            }}
          >
            Grade 12
          </Box>
          <Button variant="contained" size="small">
            View Record
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCardStyled;
