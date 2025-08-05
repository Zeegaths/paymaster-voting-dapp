"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCcw } from "lucide-react";
import { HashLoader } from "react-spinners";
import IncreaseVotesButton from "./IncreaseVotesButton";
import DecreaseVotesButton from "./DecreaseVotesButton";
import { useContractFetch } from "@/app/hooks/use-blockchain";
import { VOTING_ABI } from "@/abi/voting_abi";
import { useAccount } from "@starknet-react/core";

const VotingInterface = () => {
  const { address } = useAccount();
  const [amount, setAmount] = useState(0);
  const {
    readData: votes,
    dataRefetch: votesRefetch,
    readIsLoading: isLoadingVotes,
    readError,
    readIsReFecthing,
  } = useContractFetch(VOTING_ABI, "get_votes", []);

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-6">
      {/* Votes Display */}
      <Card className="text-center border-purple-500/20 bg-gradient-to-br from-purple-900/80 via-purple-800/60 to-black/80 backdrop-blur-xl shadow-2xl shadow-purple-500/20">
        <CardHeader>
          <CardTitle className="text-3xl font-black bg-gradient-to-r from-purple-300 via-pink-200 to-purple-400 bg-clip-text text-transparent tracking-wide">
            Current Votes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl flex justify-center font-bold bg-gradient-to-r from-purple-300 via-pink-200 to-purple-400 bg-clip-text text-transparent mb-4">
            <HashLoader
              color="hsl(0 0% 15%)"
              loading={isLoadingVotes || readIsReFecthing}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {votes &&
              !readError &&
              !isLoadingVotes &&
              !readIsReFecthing &&
              votes}
          </div>
          <Button
            variant="default"
            onClick={() => votesRefetch()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 border-0 flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Refresh Votes
          </Button>
        </CardContent>
      </Card>

      {/* Amount Input */}
      <Card className="border-purple-500/20 bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-xl shadow-xl shadow-black/30">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white">Set Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <label
              htmlFor="amount"
              className="text-sm font-medium text-purple-200 whitespace-nowrap"
            >
              Amount:
            </label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
              className="flex-1 bg-black/50 border-2 border-purple-500/30 focus:border-purple-400 text-white font-semibold rounded-lg focus:shadow-purple-500/20 transition-all duration-300"
              placeholder="Enter amount"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <IncreaseVotesButton disabled={!address} amount={amount} />
        <DecreaseVotesButton
          disabled={!address}
          amount={amount > votes ? 1 : amount}
        />
      </div>

      {!address && (
        <div className="text-center text-black-200 text-sm bg-gradient-to-r from-red-900/30 via-red-800/20 to-red-900/30 backdrop-blur-sm p-4 rounded-2xl border border-red-500/30 shadow-lg">
          Connect your wallet to interact with the Starknet voting system
        </div>
      )}
    </div>
  );
};

export default VotingInterface;