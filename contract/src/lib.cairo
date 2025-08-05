/// Interface representing `HelloContract`.
/// This interface allows modification and retrieval of the contract count.
#[starknet::interface]
pub trait IVoting<TContractState> {
    /// Increase vote count.
    fn increase_votes(ref self: TContractState, amount: u16);
    /// Increase vote count
    fn decrease_count(ref self: TContractState, amount: u16);
    /// Retrieve vote count.
    fn decrease_votes(self: @TContractState) -> u16;
}

/// Simple contract for managing count.
#[starknet::contract]
mod Counter {
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};

    #[storage]
    struct Storage {
        count: u16,
    }

    #[abi(embed_v0)]
    impl VotingImpl of super::IVoting<ContractState> {
        fn get_votes(self: @ContractState) -> u16 {
            self.votes.read()
        }

        fn increase_votes(ref self: ContractState, amount: u16) {
            assert(amount != 0, 'Amount cannot be 0');
            let current_votes = self.votes.read();
            self.votes.write(current_votes + amount);
        }

        fn decrease_votes(ref self: ContractState, amount: u16) {
            assert(amount != 0, 'Amount cannot be 0');
            let current_votes = self.votes.read();
            assert(current_votes >= amount, 'Insufficient votes');
            self.votes.write(current_votes - amount);
        }
    }
}
