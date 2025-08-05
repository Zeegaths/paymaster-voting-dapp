"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Minus } from "lucide-react";
import { useAccount } from "@starknet-react/core";
import { VOTING_CONTRACT_ADDRESS, myProvider } from "@/lib/utils";
import { CallData, FeeEstimate, PaymasterDetails } from "starknet";
import { ETH_SEPOLIA } from "@/lib/coins";

function DecreaseVotesButton({
  amount,
  disabled,
}: {
  amount: number;
  disabled: boolean;
}) {
  const { account } = useAccount();

  // useEffect(() => {
  //   async function getTokens() {
  //     const supported = await account?.paymaster.getSupportedTokens();
  //     console.log(supported);
  //   }

  //   getTokens();
  // }, [account]);

  const handleDecrease = async () => {
    // TODO: Implement Decrease count with Starknet JS
    const calls = {
      contractAddress: VOTING_CONTRACT_ADDRESS,
      entrypoint: "decrease_votes",
      calldata: CallData.compile([amount]),
    };

    // const gasToken = ETH_SEPOLIA;

    const feeDetails: PaymasterDetails = {
      feeMode: {
        mode: "sponsored",
      },
    };

    const feeEstimation = await account?.estimatePaymasterTransactionFee(
      [calls],
      feeDetails
    );

    const result = await account?.executePaymasterTransaction(
      [calls],
      feeDetails,
      feeEstimation?.suggested_max_fee_in_gas_token
    );

    const status = await myProvider.waitForTransaction(
      result?.transaction_hash as string
    );

    console.log(result);
  };
  return (
    <Button
      variant="default"
      size="lg"
      onClick={handleDecrease}
      className="h-16 flex flex-col items-center justify-center gap-1 hover:shadow-elegant"
      //   TODO: Fix disabled
      disabled={false}
    >
      <Minus className="w-6 h-6" />
      <span className="text-sm">Decrease by {amount}</span>
    </Button>
  );
}

export default DecreaseVotesButton;