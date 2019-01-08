## Configure _New_ Parity Node
_There are a number of steps to follow in order to add a new node to the network. These are described below._

### Copy An Existing Node Directory
Copy an existing node folder (i.e. `parity/nodes/3`), and name it as the next available node index.

### Generate Keypair & Ethereum Address
Use this CLI to create a keypair (run `yarn start`, then option 3 - _Derive Public Key from Private Key_).

Use the default private key (generated randomly), and corresponding public key. Copy the resultant values into the `parity/nodes/#/accounts/admin.private.key` and `parity/nodes/#/accounts/admin.public.key` files respectively (where `#` is the index of the node being created). When copying the public key, use the _Derived Public Key (Ethereum)_ value, leaving off the first 2 digits (this should always be `04`, leaving 128 characters).

This CLI can then be used to derive the Ethereum address from the private key (run `yarn start`, then option 5 - _Derive Ethereum Address_). Copy the resultant _Derived Ethereum Address_, and paste into the `accounts/address.txt` file with a preceding `0x` to denote hexadecimal address (i.e `0x21f641df60fc1d256883e81fea641573c46e1ae9`).

### Configure TOML file for New Node
Update the `account > unlock`, and `mining > engine_signer` addresses to that of the new admin account (should now be stored in `accounts/admin.address.txt` from the previous section).

### Add new Node to Chain.json
Update the list of validators in `parity/chain.json`, to include the new admin address (`engine > authorityRound > params > validators > list`).

Add the new account address to the end of the `accounts` block, and give it a starting balance of wei (`1606938044258990275541962092341162602522202993782792835301376` max).

### Create Account Keyfile
Generate keyfile from private key using the [Geth](https://geth.ethereum.org/) client:
```
geth account import << account.private.key >>
```

The keyfile will be created in the following location (Mac):
```
 ~/Library/Ethereum/keystore 
```

Copy the newly-created keystore file into the `parity/nodes/#/keys/mastering_ethereum` directory (where `#` is the index of the _new_ node being created).

### Update Docker Compose File
Copy one of the existing _Parity_ blocks from the `docker-compose.yml` file, updating the following:

1. Container name (i.e. `parity3`)
1. Port mapping on host (must be unique & not currently in use on your machine), in the format: `host_port:container_port`. The container port is typically `8545` for _RPC_, and `8546` for _WebSockets_.
1. Node-specific volume paths

### Add enode as Reserved Peer
To get the enode value for the newly-created node, first run the node with _docker compose_ (where `parity3` is the name of the container from point 1 above):

```
docker-compose up parity3
```

Once this has fully started, the _enode_ value will be displayed in the output to screen. Copy this value, and paste into the `parity/reserved_peers` file on a new line.

Towards the end of the _enode_ value will be an IP address - replace this with the container name used to start the instance (i.e. `parity3`).

_Note: starting the container creates a file in `parity/nodes/#/network/key` (where `#` is the index of the current node) that should not be removed, otherwise a new enode value will be created._
