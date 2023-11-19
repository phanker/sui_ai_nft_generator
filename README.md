# AI NFT Generator

## Technology Stack & Tools
- [Sui](https://sui.io/) (Block Chain)
- Move (Writing Smart Contracts)
- Javascript (React)
- [React.js](https://reactjs.org/) (Frontend Framework)
- [NFT.Storage](https://nft.storage/) (Connection to IPFS)
- [Hugging Face](https://huggingface.co/) (AI Models)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
`$ npm install`

### 3. Setup .env file:
Before running any scripts, you'll want to create a .env file with the following values (see .env.example):

- **REACT_APP_HUGGING_FACE_API_KEY=""**
- **REACT_APP_NFT_STORAGE_API_KEY=""**

You'll need to create an account on [Hugging Face](https://huggingface.co/), visit your profile settings, and create a read access token. 

You'll also need to create an account on [NFT.Storage](https://nft.storage/), and create a new API key.

### 4.Deploy NFT contract
In a separate terminal execute:  
`$ cd cd contract/nft/`      
`$ sui client publish --gas-budget 100000000`  
Get the 'package_id' of contract from the log of deployment:
You'll find the "Transaction Effects" log below,the named 'ID' and 'Owner: Immutable' just is 'package_id' 
```
----- Transaction Effects ----
Status : Success
Created Objects:
- ID: 0x8a399fbc415c1fb6906e86c516efabe1179dde65a4a25f1e6bf0c33255dd77ce , Owner: Immutable
- ID: 0x9090a217c4f19dfbffc3bd78242393291a55ea87ad59d71a0d5bf27d83a1862e , Owner: Account Address ( 0x5cca2192331ca9db87a6adfc756f809150aad3f8a2bf7eb3b68dd46ea03989f7 )
- ID: 0xa8bf4866f7a1b2d20e64f43c06ef83093d256763faca888f83a0c9a15bcb5be0 , Owner: Account Address ( 0x5cca2192331ca9db87a6adfc756f809150aad3f8a2bf7eb3b68dd46ea03989f7 )
- ID: 0xb636701b4ebf375faf1343b87137c5e71bdd8f4b476835c2084138721f677404 , Owner: Account Address ( 0x5cca2192331ca9db87a6adfc756f809150aad3f8a2bf7eb3b68dd46ea03989f7 )
  Mutated Objects:
- ID: 0x6eba3e64d49bf2c4e5861d60fbdabd569848db18e9cc43336fb41c967ef2b8e1 , Owner: Account Address ( 0x5cca2192331ca9db87a6adfc756f809150aad3f8a2bf7eb3b68dd46ea03989f7 )
```
### 5.Configurate 'package_id' in './constants/NFT.json' file
- **PACKAGE_ID="your_package_id"**

### 6. Start frontend
`$ npm run start`