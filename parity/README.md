# Local Parity Cluster

## Run Cluster
To run the cluster, you will need to have [Docker](https://www.docker.com/products/docker-desktop) installed. Once this is done, run:

```bash
yarn run parity:start
```

## Attach Network Monitor & Dashboard

```bash
yarn run parity:monitor
```
Once running, the dashboard can be found here: [http://localhost:3001/](http://localhost:3001)
## Configuring A Node

To add another node to the Parity cluster, follow these steps: [Parity Node Configuration](parity-configuration.md).

### Talking to a Node

#### Command Line
You can communicate with ethereum nodes via the [geth](https://geth.ethereum.org/) cli.

Using HTTP RPC:
```bash
geth attach http://parity1:8545
```

Using WebSockets:
```bash
geth attach ws://parity1:8546
```

Once attached, you will be able to run various commands with objects provided in the get command line interface (_eth_, _web3_, _net_).

#### JSON RPC

To talk to a node, you can use `curl`, or a an HTTP client such as [axios](https://www.npmjs.com/package/axios) to send requests.

See the list of [JSON-RPC Methods](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods) for notes on usage.

Requests can also be sent in a _batched_ manner, as well as individually sequentially.
