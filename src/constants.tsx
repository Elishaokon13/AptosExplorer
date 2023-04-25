/**
 * Network
 */

export const networks = {
  mainnet: "https://submove.bbd.sh/v1",
  testnet: "https://submove.bbd.sh/v1",
  devnet: "https://submove.bbd.sh/v1",
  local: "http://localhost:8080",
  previewnet: "https://submove.bbd.sh/v1",
};

export type NetworkName = "devnet";

export const defaultNetworkName: NetworkName = "devnet" as const;

if (!(defaultNetworkName in networks)) {
  throw `defaultNetworkName '${defaultNetworkName}' not in Networks!`;
}

/**
 * Feature
 */
export const features = {
  prod: "Production Mode",
  dev: "Development Mode",
  earlydev: "Early Development Mode",
};

export type FeatureName = keyof typeof features;

// Remove trailing slashes
for (const key of Object.keys(features)) {
  const featureName = key as FeatureName;
  if (features[featureName].endsWith("/")) {
    features[featureName] = features[featureName].slice(0, -1);
  }
}

export const defaultFeatureName: FeatureName = "prod" as const;

if (!(defaultFeatureName in features)) {
  throw `defaultFeatureName '${defaultFeatureName}' not in Features!`;
}

/**
 * Delegation Service
 */
export const OCTA = 100000000;
