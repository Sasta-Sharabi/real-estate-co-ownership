# `RealEstate Co-own`

## Description

It implements a real estate investment and property management platform on the Internet Computer (ICP).

It allows users to register, list properties, lease properties, and invest in tokenized property shares.

## ✨ Features

### 👤 User Management

Register as a user (register_user)

Retrieve user data (get_user_data)

Track owned properties and invested properties

### 🏢 Property Management

Register new properties with metadata (address, financial details, amenities, images, etc.)

Retrieve all registered properties (get_all_properties)

Retrieve only properties registered by the logged-in user (get_user_registered_properties)

### 📜 Lease Management

Register new lease agreements (register_lease)

View all leases (get_all_leases)

View leases associated with the current user (get_my_leases)

### 💰 Investments

Buy shares in properties (buy_share)

Track invested properties with number of shares (get_user_invested_properties)

Manage property investors and distribute ownership


## Guide to setup

Select the directory and run :

```bash
git clone https://github.com/Sasta-Sharabi/real-estate-co-ownership.git
```

Change directory to `/real-estate-co-ownership`

```bash
cd real-estate-co-ownership
```

Install node dependency :

In `/real-estate-co-ownership` directory, run :

```bash
npm install
```

In `/real-estate-co-ownership/src/project_frontend` , run :

```bash
npm install
```


## Running the project locally

If you want to test your project locally, you can use the following commands in `/real-estate-co-ownership` directory:

```bash
# Starts the replica, running in the background
dfx start --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

If you have made changes to your backend canister, you can generate a new candid interface with

```bash
npm run generate
```

If you are making frontend changes, you can start a frontend development server with

```bash
npm start
```
## Areas of Improvement

1. Wallet can be integrated
2. Image storage via IPFS can be featured
3. Selling the shares
4. Portfolio overview
5. Rent payment


