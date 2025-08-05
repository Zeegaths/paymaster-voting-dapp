use contract::{
    ICounterDispatcher, ICounterDispatcherTrait, ICounterSafeDispatcher,
    ICounterSafeDispatcherTrait,
};
use snforge_std::{ContractClassTrait, DeclareResultTrait, declare};
use starknet::ContractAddress;

fn deploy_contract(name: ByteArray) -> ContractAddress {
    let contract = declare(name).unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();
    contract_address
}

#[test]
fn test_increase_count() {
    let contract_address = deploy_contract("Counter");

    let dispatcher = ICounterDispatcher { contract_address };

    let count_before = dispatcher.get_count();
    assert(count_before == 0, 'Invalid count');

    dispatcher.increase_count(42);

    let count_after = dispatcher.get_count();
    assert(count_after == 42, 'Invalid count');
}

#[test]
#[feature("safe_dispatcher")]
fn test_cannot_increase_count_with_zero_value() {
    let contract_address = deploy_contract("Counter");

    let safe_dispatcher = ICounterSafeDispatcher { contract_address };

    let count_before = safe_dispatcher.get_count().unwrap();
    assert(count_before == 0, 'Invalid count');

    match safe_dispatcher.increase_count(0) {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
        },
    };
}

#[test]
fn test_decrease_count() {
    let contract_address = deploy_contract("Counter");

    let dispatcher = ICounterDispatcher { contract_address };

    let count_before = dispatcher.get_count();
    assert(count_before == 0, 'Invalid count');

    dispatcher.increase_count(40);
    dispatcher.decrease_count(10);

    let count_after = dispatcher.get_count();
    assert(count_after == 30, 'Invalid count');
}

#[test]
#[feature("safe_dispatcher")]
fn test_cannot_decrease_count_with_zero_value() {
    let contract_address = deploy_contract("Counter");

    let safe_dispatcher = ICounterSafeDispatcher { contract_address };

    let count_before = safe_dispatcher.get_count().unwrap();
    assert(count_before == 0, 'Invalid count');

    match safe_dispatcher.decrease_count(0) {
        Result::Ok(_) => core::panic_with_felt252('Should have panicked'),
        Result::Err(panic_data) => {
            assert(*panic_data.at(0) == 'Amount cannot be 0', *panic_data.at(0));
        },
    };
}
