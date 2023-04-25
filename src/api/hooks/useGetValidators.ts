import {useMemo} from "react";
import {NetworkName} from "../../constants";

export interface ValidatorData {
  owner_address: string;
  operator_address: string;
  voting_power: string;
  governance_voting_record: string;
  last_epoch: number;
  last_epoch_performance: string;
  liveness: number;
  rewards_growth: number;
  location_stats?: GeoData;
  apt_rewards_distributed: number;
}

export interface GeoData {
  peer_id: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  region: string;
  epoch: number;
}

export function useGetValidators(network?: NetworkName) {
  const validators = useMemo<ValidatorData[]>(() => [], []);

  return {validators};
}
