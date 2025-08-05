"use client";
import React, { useMemo, useState } from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import {
  useContract,
  usePaymasterEstimateFees,
  usePaymasterGasTokens,
  usePaymasterSendTransaction,
  useTransactionReceipt,
} from "@starknet-react/core";
import { VOTING_ABI } from "@/abi/voting_abi";
import { VOTING_CONTRACT_ADDRESS } from "@/lib/utils";
import { ETH_SEPOLIA } from "@/lib/coins";
import { FeeMode } from "starknet";

function IncreaseVotesButton({
  amount,
  disabled,
}: {
  amount: number;
  disabled: boolean;
}) {
  // const { data, error } = usePaymasterGasTokens();
  // console.log(data);
  const [loading, setIsLoading] = useState(false);
  const { contract } = useContract({
    abi: VOTING_ABI,
    address: VOTING_CONTRACT_ADDRESS,
  });

  const feeMode: FeeMode = {
    mode: "sponsored",
    // mode: "default",
    // gasToken: ETH_SEPOLIA,
  };

  const calls = useMemo(() => {
    if (!contract || !amount) {
      return undefined;
    }

    return [contract.populate("increase_votes", [amount])];
  }, [contract, amount]);

  const {
    data: estimateData,
    isPending: isPendingEstimate,
    error: errorEstimate,
  } = usePaymasterEstimateFees({
    calls,
    options: {
      feeMode,
    },
  });

  const {
    sendAsync: sendGasless,
    data: sendData,
    isPending: isPendingSend,
    error: errorSend,
  } = usePaymasterSendTransaction({
    calls,
    options: {
      feeMode,
    },
    maxFeeInGasToken: estimateData?.suggested_max_fee_in_gas_token,
  });

  const {
    isLoading: waitIsLoading,
    data: waitData,
    status,
    isError,
    error,
  } = useTransactionReceipt({
    hash: sendData?.transaction_hash,
    watch: true,
  });

  const handleIncrease = async () => {
    // TODO: Implement increase count with Starknet React
    try {
      setIsLoading(true);
      sendGasless();
    } catch (err) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="default"
      size="lg"
      onClick={handleIncrease}
      className="h-16 flex flex-col items-center justify-center gap-1 hover:shadow-elegant"     
      disabled={waitIsLoading || isPendingSend || loading}
    >
      <Plus className="w-6 h-6" />
      <span className="text-sm">Increase by {amount}</span>
    </Button>
  );
}

export default IncreaseVotesButton;