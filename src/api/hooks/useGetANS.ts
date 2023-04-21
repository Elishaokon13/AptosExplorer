import {useEffect, useState} from "react";
import {NetworkName} from "../../constants";
import {useGlobalState} from "../../GlobalState";
import {fetchJsonResponse, truncateAptSuffix} from "../../utils";

function getFetchNameUrl(
  network: NetworkName,
  address: string,
  isPrimary: boolean,
) {
  return isPrimary
    ? `https://www.aptosnames.com/api/${network}/v1/primary-name/${address}`
    : `https://www.aptosnames.com/api/${network}/v1/name/${address}`;
}

export function useGetNameFromAddress(address: string) {
  const [state, _] = useGlobalState();
  const [name, setName] = useState<string | undefined>();

  useEffect(() => {
    const primaryNameUrl = getFetchNameUrl(state.network_name, address, true);
    const fetchData = async () => {
      const {name: primaryName} = await fetchJsonResponse(primaryNameUrl);

      if (primaryName) {
        setName(primaryName);
      } else {
        const nameUrl =
          getFetchNameUrl(state.network_name, address, false) ?? "";
        const {name} = await fetchJsonResponse(nameUrl);
        setName(name);
      }
    };

    fetchData().catch((error) => {
      console.error("ERROR!", error, typeof error);
    });
  }, [address, state]);

  return name;
}

export async function getAddressFromName(
  name: string,
  network: NetworkName,
): Promise<{address: string | undefined; primaryName: string | undefined}> {
  const searchableName = truncateAptSuffix(name);
  const addressUrl = `https://www.aptosnames.com/api/${network}/v1/address/${searchableName}`;

  const notFoundResult = {address: undefined, primaryName: undefined};

  try {
    const {address} = await fetchJsonResponse(addressUrl);

    const primaryNameUrl = getFetchNameUrl(network, address, true);
    const primaryNameResponse = await fetch(primaryNameUrl ?? "");
    const {name: primaryName} = await primaryNameResponse.json();

    return {address: address, primaryName: primaryName};
  } catch {
    return notFoundResult;
  }
}
