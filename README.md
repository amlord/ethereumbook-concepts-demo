# Mastering Ethereum Book - Concepts Demo CLI
A CLI for demonstration of concepts in the "Mastering Ethereum" book by Andreas M. Antonopoulos


## Node Version 
This CLI uses node **v10.14.2**, some functionality _may not work_ with lower versions.

If you're using [NVM](https://github.com/creationix/nvm), simply run:
```javascript
nvm use
```
Otherwise, check which version you're using:
```javascript
node -v
```
...and upgrade if necessary.

## Install
```javascript
yarn install
```

## Run
Start the CLI:
```javascript
yarn start
```

## Test
Run test suite:
```javascript
yarn test
```

## Lint
Run code formatter:
```javascript
yarn lint
```

## Functionality
1. Generate CSPRN (cryptographically secure pseudo-random number)
1. Generate Private Key
1. Derive Public Key from Private Key
1. Elliptic Curve Check
1. Derive Ethereum Address
1. Ethereum Address Checksum (EIP-55)
1. Generate Mnemonic (BIP-39)
1. Derive Hierarchical Deterministic (HD) Wallet Accounts (BIP-44)
