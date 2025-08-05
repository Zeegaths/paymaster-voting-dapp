import { Abi } from "starknet";

export const VOTING_ABI: Abi = [
  {
    "type": "impl",
    "name": "VotingImpl",
    "interface_name": "starknet_multiple_contracts::IVoting"
  },
  {
    "type": "interface",
    "name": "starknet_multiple_contracts::IVoting",
    "items": [
      {
        "type": "function",
        "name": "increase_votes",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "decrease_votes",
        "inputs": [
          {
            "name": "amount",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_votes",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u16"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "event",
    "name": "starknet_multiple_contracts::VotingDapp::Event",
    "kind": "enum",
    "variants": []
  }
]