import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "#1a1a1a", color: "#f0f0f0", mt: 10, pt: 6, pb: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Company */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Company
          </Typography>
          <Link component={RouterLink} to="/about" underline="hover" color="inherit" display="block">
            About
          </Link>
{/*           <Link component={RouterLink} to="/blogs" underline="hover" color="inherit" display="block">
            Blogs
          </Link> */}
        </Grid>

        {/* Support */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Support
          </Typography>
          <Link component={RouterLink} to="/contact" underline="hover" color="inherit" display="block">
            Contact
          </Link>
        </Grid>

        {/* Legal */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Legal
          </Typography>
          <Link component={RouterLink} to="/privacy-policy" underline="hover" color="inherit" display="block">
            Privacy Policy
          </Link>
          <Link component={RouterLink} to="/terms-and-conditions" underline="hover" color="inherit" display="block">
            Terms & Conditions
          </Link>
          <Link component={RouterLink} to="/refund-policy" underline="hover" color="inherit" display="block">
            Return & Refund Policy
          </Link>
          <Link component={RouterLink} to="/shipping-policy" underline="hover" color="inherit" display="block">
            Shipping & Delivery
          </Link>
          <Link component={RouterLink} to="/cancellation-policy" underline="hover" color="inherit" display="block">
            Cancellation Policy
          </Link>
        </Grid>
      </Grid>

      <Box sx={{ mt: 6, borderTop: "1px solid #333", pt: 3, textAlign: "center" }}>
        <Typography variant="body2" color="#aaa">
          &copy; {new Date().getFullYear()} Nari Vastaram. All rights reserved.
        </Typography>
        <Typography variant="body2" color="#777">
          Crafted with by Kshitij Raj
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
