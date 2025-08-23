use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use std::collections::HashMap;
use ic_cdk::{storage, caller};
use std::cell::RefCell;

pub type PropertyId = u128;

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct UserInvestment {
    pub property_id: PropertyId,
    pub shares_owned: u128,
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct UserData {
    pub total_investment: u128,
    pub current_value: u128,
    pub monthly_income: u128,
    pub total_return: u128,
    pub user_registered_properties: Vec<PropertyId>,
    pub user_invested_properties: Vec<UserInvestment>,
}

#[derive(Default, CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct StorageState {
    pub all_users: HashMap<Principal, UserData>,
}

thread_local! {
    static STATE: RefCell<StorageState> = RefCell::new(StorageState::default());
}

// Save state to stable memory
pub fn save_state(state: &StorageState) {
    storage::stable_save((state,))
        .expect("Failed to save state to stable memory");
}

#[ic_cdk::update]
pub fn register_user() -> String {
    let user = caller();
    if user == Principal::anonymous() {
        return "Anonymous Principal not allowed".to_string();
    }

    // Immutable borrow first
    STATE.with(|s| {
        {
            let state = s.borrow();
            if state.all_users.contains_key(&user) {
                return "User already registered".to_string();
            }
        } // drop immutable borrow

        // Mutable borrow for insertion
        let mut state = s.borrow_mut();
        state.all_users.insert(user, UserData {
            total_investment: 1,
            current_value: 0,
            monthly_income: 0,
            total_return: 0,
            user_registered_properties: vec![],
            user_invested_properties: vec![],
        });
        save_state(&state);

        "User registered successfully".to_string()
    })
}

#[ic_cdk::update]
pub fn get_user_data() -> UserData {
    let user_principal = caller();

    STATE.with(|s| {
        // Immutable borrow first to check if user exists
        {
            let state = s.borrow();
            if let Some(data) = state.all_users.get(&user_principal) {
                return data.clone();
            }
        } // drop immutable borrow

        // Mutable borrow to insert default user
        let mut state = s.borrow_mut();
        let default_data = UserData {
            total_investment: 2,
            current_value: 0,
            monthly_income: 0,
            total_return: 0,
            user_registered_properties: vec![],
            user_invested_properties: vec![],
        };
        state.all_users.insert(user_principal, default_data.clone());
        save_state(&state);

        default_data
    })
}
