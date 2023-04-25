import React from "react";
import {Box, Container, Link, Typography, useTheme} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2";

import {grey} from "../../themes/colors/colorPalette";

import {ReactComponent as LogoFull} from "../../assets/svg/aptos_logo_icon.svg";

export default function Footer() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: theme.palette.mode === "dark" ? grey[900] : "white",
        color: theme.palette.mode === "dark" ? grey[100] : "rgba(18,22,21,1)",
        mt: 8,
      }}
    >
      <Container maxWidth="xl" sx={{paddingTop: "2rem", paddingBottom: "2rem"}}>
        <Grid
          container
          spacing={{xs: 4, md: 1}}
          alignContent="center"
          alignItems="center"
          direction={{xs: "column", md: "row"}}
        >
          <Grid xs="auto" container justifyContent="start">
            <Link
              color="inherit"
              href="https://aptoslabs.com/"
              target="_blank"
              sx={{width: "3rem", mb: {xs: 2, md: 0}, mr: {md: 2}}}
            >
              <LogoFull />
            </Link>
          </Grid>
          <Grid
            xs="auto"
            container
            direction={{xs: "column"}}
            justifyContent="start"
          >
            <Typography
              sx={{
                textAlign: {
                  xs: "center",
                  md: "left",
                  fontFamily: "apparat, Geneva, Tahoma, Verdana, sans-serif",
                },
              }}
              fontSize="0.8rem"
            >
              © {new Date().getFullYear()}{" "}
              <Box component="span" sx={{whiteSpace: "nowrap"}}>
                MVMT
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
