import React from "react";
import {Typography, Stack, useTheme} from "@mui/material";
import {grey} from "../../../themes/colors/colorPalette";
import {CardWithStyle} from "../../../components/Card";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import StyledTooltip from "../../../components/StyledTooltip";

function Data({children}: {children: React.ReactNode}) {
  return (
    <Typography fontSize={20} fontWeight={400}>
      {children}
    </Typography>
  );
}

function SubLabel({children}: {children: React.ReactNode}) {
  const theme = useTheme();
  const color = theme.palette.mode === "dark" ? grey[400] : grey[500];
  return (
    <Typography fontSize={10} color={color}>
      {children}
    </Typography>
  );
}

function MetricCardComponent({
  children,
  label,
  tooltip,
}: {
  children: React.ReactNode;
  label: string;
  tooltip: NonNullable<React.ReactNode>;
}) {
  return (
    <CardWithStyle height={120}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography fontSize={12}>{label}</Typography>
          <StyledTooltip title={tooltip} placement="top">
            <InfoOutlinedIcon sx={{fontSize: 15, color: grey[450]}} />
          </StyledTooltip>
        </Stack>
        {children}
      </Stack>
    </CardWithStyle>
  );
}

type MetricCardProps = {
  data: string;
  label: string;
  tooltip: NonNullable<React.ReactNode>;
};

export default function MetricCard({data, label, tooltip}: MetricCardProps) {
  return (
    <MetricCardComponent label={label} tooltip={tooltip}>
      <Data>{data}</Data>
    </MetricCardComponent>
  );
}
