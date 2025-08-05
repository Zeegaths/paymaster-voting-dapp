import { clsx, type ClassValue } from "clsx";
import { RpcProvider } from "starknet";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const myProvider = new RpcProvider({
  nodeUrl: process.env.NEXT_PUBLIC_RPC_URL,
});

export const VOTING_CONTRACT_ADDRESS =
  "0x3cb83f57a7ce3e956a97aaf04a9cfed775c6025f910f552cbc3d2d751aba9b3";
