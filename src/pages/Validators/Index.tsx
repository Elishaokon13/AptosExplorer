import {Box, Typography} from "@mui/material";
import * as React from "react";
import PageHeader from "../layout/PageHeader";
import {StakingBanner} from "./StakingBanner";
import ValidatorsPageTabs from "./Tabs";

export default function ValidatorsPage() {
  return (
    <Box>
      <PageHeader />
      <Typography variant="h3" marginBottom={2}>
        Validators
      </Typography>
      <StakingBanner />
      <ValidatorsPageTabs />
    </Box>
  );
}
