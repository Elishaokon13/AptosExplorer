import * as React from "react";
import {Box} from "@mui/material";
import {ValidatorsTable} from "./Table";

export default function ValidatorsPageTabs(): JSX.Element {
  return (
    <Box sx={{width: "100%"}}>
      <Box sx={{width: "auto", overflowX: "auto"}}>
        <ValidatorsTable />
      </Box>
    </Box>
  );
}
