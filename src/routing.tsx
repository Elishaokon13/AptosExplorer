import {Link as MuiLink} from "@mui/material";
import React from "react";
import {
  NavigateOptions,
  Link as RouterLink,
  useSearchParams,
} from "react-router-dom";
import {
  useNavigate as useNavigateRaw,
  createSearchParams,
} from "react-router-dom";

export function Link({to, children}: {to: string; children: React.ReactNode}) {
  return (
    <MuiLink
      component={RouterLink}
      to={to}
      style={{textDecoration: "none", color: "inherit"}}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {children}
    </MuiLink>
  );
}

// This is a wrapper around useNavigate that ensures that some global params stay persistent across all navs
// Concretely `network` and `feature` are treated as global persistent params
export function useNavigate() {
  const navigateRaw = useNavigateRaw();
  const [searchParam] = useSearchParams();

  const globalPersistentParams: Record<string, string> = {};

  if (searchParam.has("network")) {
    globalPersistentParams.network = searchParam.get("network")!;
  }
  if (searchParam.has("feature")) {
    globalPersistentParams.feature = searchParam.get("feature")!;
  }

  function navigate(to: string, options?: NavigateOptions): void;
  function navigate(to: number): void;
  function navigate(to: string | number, options?: NavigateOptions) {
    if (typeof to === "number") {
      return navigateRaw(to);
    }

    const globalPersistentParamsString = createSearchParams(
      globalPersistentParams,
    );

    if (globalPersistentParamsString && !to.includes("?")) {
      to += `?${globalPersistentParamsString}`;
    } else {
      to += `&${globalPersistentParamsString}`;
    }

    navigateRaw(to, options);
  }

  return navigate;
}
