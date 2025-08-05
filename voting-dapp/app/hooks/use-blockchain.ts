import { useReadContract } from "@starknet-react/core";
import { Abi } from "starknet";

const VOTING_CONTRACT_ADDRESS =
  "0x3cb83f57a7ce3e956a97aaf04a9cfed775c6025f910f552cbc3d2d751aba9b3";

// Utility function to perform contract read operations
export function useContractFetch(
  abi: Abi,
  functionName: string,
  args: any[] = []
) {
  const {
    data: readData,
    refetch: dataRefetch,
    isError: readIsError,
    isLoading: readIsLoading,
    isFetching: readIsReFecthing,
    error: readError,
  } = useReadContract({
    abi: abi,
    functionName: functionName,
    address: VOTING_CONTRACT_ADDRESS,
    args: args,
    refetchInterval: 120000,
  });

  return {
    readData,
    dataRefetch,
    readIsError,
    readIsLoading,
    readError,
    readIsReFecthing,
  };
}
