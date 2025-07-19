import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#1a1a1a", color: "#f0f0f0", mt: 10, pt: 6, pb: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Link href="#" underline="hover" color="inherit" display="block">
            About
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block">
            Blogs
          </Link>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Link href="#" underline="hover" color="inherit" display="block">
            Contact
          </Link>
          <Link href="#" underline="hover" color="inherit" display="block">
            Help Center
          </Link>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, borderTop: "1px solid #333", pt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="#aaa">
          &copy; {new Date().getFullYear()} My Company. All rights reserved.
        </Typography>
        <Typography variant="body2" color="#777">
          Made by Kshitij Raj
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
