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
    pub all_properties: Vec<Property>,
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
    pub monthly_rent: u128,   // base rent (per month)
    pub collected_rent: u128, // accumulated rent awaiting distribution
    pub investors: HashMap<Principal, u128>,
    pub owner: Principal, // property registrar/owner
}

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
            owner: Principal::anonymous(), // placeholder
        }
    }
}

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

        // convert property_type string to enum
        let property_type_enum = match property_type.as_str() {
            "Residential" => PropertyType::Residential,
            "Industrial" => PropertyType::Industrial,
            "Commercial" => PropertyType::Commercial,
            "MixedUse" => PropertyType::MixedUse,
            _ => return "Invalid property type".to_string(),
        };
        

        // // convert amenities strings to enum
        let amenities_enum: Vec<Amenity> = amenities
            .into_iter()
            .filter_map(|a| match a.as_str() {
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
            })
            .collect();


        let id = state.all_properties.len() as u128 + 1;

        let property = Property {
            id,
            title,
            property_type: property_type_enum,
            // property_type : PropertyType::default(),
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
            // financial_details : PropertyFinancialDetails::default(),
            property_description: description,
            amenities: amenities_enum,
            // amenities : vec![],
            images,
            // images : vec![],
            monthly_rent,
            // monthly_rent : 0,
            collected_rent: 0,
            // collected_rent: 0,
            investors: HashMap::new(),
            owner: caller(),
        };

        // let mut property = Property::default();
        // property.id = id;
        // property.owner = caller();

        state.all_properties.push(property);

        let user = state.all_users.entry(caller()).or_insert(UserData {
            total_investment: 0,
            current_value: 0,
            monthly_income: 0,
            total_return: 0,
            user_registered_properties: vec![],
            user_invested_properties: vec![],
        });
        user.user_registered_properties.push(id);

        save_state(&state);

        format!("Property registered successfully with id: {}", id)
    })
}
