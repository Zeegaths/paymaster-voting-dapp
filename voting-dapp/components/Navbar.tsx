"use client";
import { useState } from "react";
import { Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletModal from "./WalletModal";
import AccountModal from "./AccountModal";
import { useAccount } from "@starknet-react/core";

const Navbar = () => {
  const { address } = useAccount();
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <nav className="border-b border-purple-500/20 bg-gradient-to-r from-black via-purple-950/80 to-black backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-purple-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 transition-all duration-300 group-hover:shadow-purple-500/50 group-hover:scale-105">
                  <span className="text-white font-black text-xl tracking-wider">
                    S
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-gradient-to-r from-purple-300 via-pink-200 to-purple-400 bg-clip-text text-transparent tracking-tight">
                  STARKNET
                </span>
                <span className="text-sm font-semibold text-purple-300/80 tracking-wider uppercase">
                  Voting DApp
                </span>
              </div>
            </div>

            {/* Connect Wallet / Account */}
            <div className="flex items-center">
              {!address ? (
                <Button
                  variant="default"
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 border-0 flex items-center gap-3"
                >
                  <Wallet className="w-5 h-5" />
                  <span className="tracking-wide">Connect Wallet</span>
                </Button>
              ) : (
                <button
                  onClick={() => setShowAccountModal(true)}
                  className="group flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-900/80 via-purple-900/40 to-gray-900/80 border border-purple-500/30 backdrop-blur-sm hover:border-purple-400/60 transition-all duration-300 shadow-lg hover:shadow-purple-500/20 transform hover:scale-105"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-pulse"></div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-semibold text-purple-300/80 uppercase tracking-wider">
                      Connected
                    </span>
                    <span className="font-mono text-sm text-white font-semibold tracking-wide">
                      {shortenAddress(address)}
                    </span>
                  </div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subtle bottom glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </nav>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
      />

      <AccountModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
      />
    </>
  );
};

export default Navbar;