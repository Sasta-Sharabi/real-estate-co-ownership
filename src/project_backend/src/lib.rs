use candid::{CandidType, Deserialize, Principal};
use serde::Serialize;
use std::collections::HashMap;
use ic_cdk::{storage, caller};
use std::cell::RefCell;

// ==================== Type Aliases ====================
pub type PropertyId = u128;
pub type Timestamp = u64;
pub type LeaseId = u128;

// ==================== User Structures ====================
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

// ==================== Property Structures ====================
#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct PropertyAddress {
    pub street: String,
    pub city: String,
    pub state: String,
    pub zipcode: u64,
}

impl Default for PropertyAddress {
    fn default() -> Self {
        Self {
            street: String::new(),
            city: String::new(),
            state: String::new(),
            zipcode: 0,
        }
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct PropertyFinancialDetails {
    pub total_property_value: u128,
    pub available_shares: u128,
    pub price_per_share: u128,
}

impl Default for PropertyFinancialDetails {
    fn default() -> Self {
        Self {
            total_property_value: 0,
            available_shares: 0,
            price_per_share: 0,
        }
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum PropertyType {
    Residential,
    Industrial,
    Commercial,
    MixedUse,
}

impl Default for PropertyType {
    fn default() -> Self {
        PropertyType::Residential
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug, PartialEq, Eq, Hash)]
pub enum Amenity {
    Parking,
    Pool,
    Gym,
    Security,
    Garden,
    Balcony,
    AirConditioning,
    Heating,
    Elevator,
    Storage,
}

impl Default for Amenity {
    fn default() -> Self {
        Amenity::Parking
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct Property {
    pub id: PropertyId,
    pub title: String,
    pub property_type: PropertyType,
    pub address: PropertyAddress,
    pub financial_details: PropertyFinancialDetails,
    pub property_description: String,
    pub amenities: Vec<Amenity>,
    pub images: Vec<String>,
    pub monthly_rent: u128,
    pub collected_rent: u128,
    pub investors: HashMap<Principal, u128>,
    pub owner: Principal,
}

impl Default for Property {
    fn default() -> Self {
        Self {
            id: 0,
            title: String::new(),
            property_type: PropertyType::default(),
            address: PropertyAddress::default(),
            financial_details: PropertyFinancialDetails::default(),
            property_description: String::new(),
            amenities: vec![],
            images: vec![],
            monthly_rent: 0,
            collected_rent: 0,
            investors: HashMap::new(),
            owner: Principal::anonymous(),
        }
    }
}

// ==================== Lease Structures ====================
#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub enum LeaseStatus {
    Active,
    Terminated,
    Pending,
}

impl Default for LeaseStatus {
    fn default() -> Self {
        LeaseStatus::Pending
    }
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct Lease {
    pub lease_id: LeaseId,
    pub property_id: PropertyId,
    pub tenant_name: String,
    pub tenant: Principal,
    pub tenant_email: String,
    pub tenant_phone: String,
    pub lease_start_date: String,
    pub lease_end_date: String,
    pub monthly_rent: u128,
    pub security_deposit: u128,
    pub lease_terms: String,
    pub special_conditions: String,
    pub status: LeaseStatus,
}

// ==================== Combined Storage ====================
#[derive(Default, CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct StorageState {
    pub all_users: HashMap<Principal, UserData>,
    pub all_properties: Vec<Property>,
    pub all_leases: Vec<Lease>,
}

// Thread-local storage for canister state
thread_local! {
    static STATE: RefCell<StorageState> = RefCell::new(StorageState::default());
}

// ==================== Stable Memory Helpers ====================
pub fn save_state(state: &StorageState) {
    storage::stable_save((state,))
        .expect("Failed to save state to stable memory");
}

// ==================== User Functions ====================
#[ic_cdk::update]
pub fn register_user() -> String {
    let user = caller();
    if user == Principal::anonymous() {
        return "Anonymous Principal not allowed".to_string();
    }

    STATE.with(|s| {
        {
            let state = s.borrow();
            if state.all_users.contains_key(&user) {
                return "User already registered".to_string();
            }
        } // drop immutable borrow

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

#[ic_cdk::query]
pub fn get_user_data() -> UserData {
    let user_principal = caller();

    STATE.with(|s| {
        {
            let state = s.borrow();
            if let Some(data) = state.all_users.get(&user_principal) {
                return data.clone();
            }
        }

        let mut state = s.borrow_mut();
        let default_data = UserData {
            total_investment: 0,
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

// ==================== Property Functions ====================
#[ic_cdk::update]
pub fn register_property(
    title: String,
    street: String,
    city: String,
    state_name: String,
    zip_code: u64,
    property_type: String,
    total_value: u128,
    available_shares: u128,
    price_per_share: u128,
    description: String,
    amenities: Vec<String>,
    images: Vec<String>,
    monthly_rent: u128,
) -> String {
    STATE.with(|s| {
        let mut state = s.borrow_mut();

        // Convert property type string to enum
        let property_type_enum = match property_type.as_str() {
            "Residential" => PropertyType::Residential,
            "Industrial" => PropertyType::Industrial,
            "Commercial" => PropertyType::Commercial,
            "MixedUse" => PropertyType::MixedUse,
            _ => return "Invalid property type".to_string(),
        };

        // Convert amenities string to enum
        let amenities_enum: Vec<Amenity> = amenities.into_iter().filter_map(|a| match a.as_str() {
            "Parking" => Some(Amenity::Parking),
            "Pool" => Some(Amenity::Pool),
            "Gym" => Some(Amenity::Gym),
            "Security" => Some(Amenity::Security),
            "Garden" => Some(Amenity::Garden),
            "Balcony" => Some(Amenity::Balcony),
            "AirConditioning" => Some(Amenity::AirConditioning),
            "Heating" => Some(Amenity::Heating),
            "Elevator" => Some(Amenity::Elevator),
            "Storage" => Some(Amenity::Storage),
            _ => None,
        }).collect();

        let id = state.all_properties.len() as u128 + 1;

        let property = Property {
            id,
            title,
            property_type: property_type_enum,
            address: PropertyAddress {
                street,
                city,
                state: state_name,
                zipcode: zip_code,
            },
            financial_details: PropertyFinancialDetails {
                total_property_value: total_value,
                available_shares,
                price_per_share,
            },
            property_description: description,
            amenities: amenities_enum,
            images,
            monthly_rent,
            collected_rent: 0,
            investors: HashMap::new(),
            owner: caller(),
        };

        state.all_properties.push(property);

        // Update user data with this property
        let user = state.all_users.entry(caller()).or_insert(UserData {
            total_investment: 0,
            current_value: 0,
            monthly_income: 0,
            total_return: 0,
            user_registered_properties: vec![],
            user_invested_properties: vec![],
        });
        user.user_registered_properties.push(id);
        user.monthly_income += monthly_rent;

        save_state(&state);

        format!("Property registered successfully with id: {}", id)
    })
}

#[ic_cdk::query]
pub fn get_all_properties() -> Vec<Property> {
    STATE.with(|s| s.borrow().all_properties.clone())
}

#[ic_cdk::query]
pub fn get_user_registered_properties() -> Vec<Property> {
    let user = caller();
    STATE.with(|s| {
        let state = s.borrow();
        if let Some(user_data) = state.all_users.get(&user) {
            state.all_properties
                .iter()
                .filter(|p| user_data.user_registered_properties.contains(&p.id))
                .cloned()
                .collect()
        } else {
            vec![]
        }
    })
}

// ==================== Lease Functions ====================
#[ic_cdk::update]
pub fn register_lease(
    property_id: PropertyId,
    tenant_name: String,
    tenant_email: String,
    tenant_phone: String,
    lease_start_date: String,
    lease_end_date: String,
    monthly_rent: u128,
    security_deposit: u128,
    lease_terms: String,
    special_conditions: String,
) -> String {
    let caller_principal = caller();

    STATE.with(|s| {
        let mut state = s.borrow_mut();
        let lease_id = state.all_leases.len() as u128 + 1;

        let lease = Lease {
            lease_id,
            property_id,
            tenant: caller_principal,
            tenant_name,
            tenant_email,
            tenant_phone,
            lease_start_date,
            lease_end_date,
            monthly_rent,
            security_deposit,
            lease_terms,
            special_conditions,
            status: LeaseStatus::Active,
        };

        state.all_leases.push(lease);

        format!("Lease registered with ID: {}", lease_id)
    })
}

#[ic_cdk::query]
pub fn get_all_leases() -> Vec<Lease> {
    STATE.with(|s| s.borrow().all_leases.clone())
}

#[ic_cdk::query]
pub fn get_my_leases() -> Vec<Lease> {
    let user = caller();
    STATE.with(|s| {
        s.borrow()
            .all_leases
            .iter()
            .filter(|l| l.tenant == user)
            .cloned()
            .collect()
    })
}

// ==================== Investment Functions ====================
#[ic_cdk::update]
pub fn buy_share(property_id: PropertyId, shares_to_buy: u128) -> String {
    if shares_to_buy == 0 {
        return "Cannot buy zero shares".to_string();
    }

    let buyer = caller();

    STATE.with(|s| {
        let mut state = s.borrow_mut();

        let property = match state.all_properties.iter_mut().find(|p| p.id == property_id) {
            Some(p) => p,
            None => return "Property not found".to_string(),
        };

        if property.financial_details.available_shares < shares_to_buy {
            return format!(
                "Not enough shares available. Only {} shares left",
                property.financial_details.available_shares
            );
        }

        let total_cost = shares_to_buy * property.financial_details.price_per_share;
        property.financial_details.available_shares -= shares_to_buy;
        *property.investors.entry(buyer).or_insert(0) += shares_to_buy;

        let user_data = state.all_users.entry(buyer).or_insert(UserData {
            total_investment: 0,
            current_value: 0,
            monthly_income: 0,
            total_return: 0,
            user_registered_properties: vec![],
            user_invested_properties: vec![],
        });

        user_data.total_investment += total_cost;
        user_data.current_value += total_cost;

        match user_data.user_invested_properties.iter_mut().find(|inv| inv.property_id == property_id) {
            Some(inv) => inv.shares_owned += shares_to_buy,
            None => user_data.user_invested_properties.push(UserInvestment {
                property_id,
                shares_owned: shares_to_buy,
            }),
        };

        save_state(&state);

        format!(
            "Successfully bought {} shares of property {} for a total of {} tokens",
            shares_to_buy, property_id, total_cost
        )
    })
}

#[derive(CandidType, Deserialize, Serialize, Clone, Debug)]
pub struct UserInvestedProperty {
    pub property: Property,
    pub shares_owned: u128,
}

#[ic_cdk::query]
pub fn get_user_invested_properties() -> Vec<UserInvestedProperty> {
    let user = caller();
    STATE.with(|s| {
        let state = s.borrow();
        if let Some(user_data) = state.all_users.get(&user) {
            user_data.user_invested_properties.iter()
                .filter_map(|investment| {
                    state.all_properties.iter()
                        .find(|p| p.id == investment.property_id)
                        .map(|property| UserInvestedProperty {
                            property: property.clone(),
                            shares_owned: investment.shares_owned,
                        })
                }).collect()
        } else {
            vec![]
        }
    })
}

// ==================== Upgrade Hooks ====================
#[ic_cdk::pre_upgrade]
fn pre_upgrade() {
    STATE.with(|s| save_state(&s.borrow()));
}

#[ic_cdk::post_upgrade]
fn post_upgrade() {
    let (stored_state,): (StorageState,) =
        ic_cdk::storage::stable_restore().expect("Failed to restore state from stable memory");
    STATE.with(|s| *s.borrow_mut() = stored_state);
}
