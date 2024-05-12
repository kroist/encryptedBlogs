# Encrypted DeBlogging Platform

You can check it
https://zabauski.site

## Motivation

Disribution of paid encrypted content is a large problem. Nowadays, users on internet can easily share with each other encrypted data.
However, it is hard to sell such data without relying on centralized parties. We leverage FHE and IPFS in order to remove trust from the process of selling encrypted data through blockchain.
As an implementation of our protocol, we introduce novel blogging platform.

## Protocol

You can't just implement full data decryption system inside smart contracts, because no blockchain would scale well with this approach.

That's why we do another approach, where we offload decryption to special relayers.

### Definitions

- `Creator` - someone, who wants to encrypt and sell his content through protocol
- `User` - someone, who is willing to buy encrypted content from `Creator`
- `Chain` - blockchain with FHE operations supported. In case of this implementation, we use Zama's fhEVM.
- `IPFS` - p2p file distribution protocol. In our case it is IPFS P2P protocol, which the name says for itself.
- `Relayer` - entity who helps the protocol to work.
- $text$ - plaintext to distribute (markdown code in our case) 

### Assumptions

There are some assumptions, that we need to define before calling the protocol "trustless".

1. `User`'s client can't leak private content. Modern clients (such as phones) may prevent users from doing screenshots of privacy apps, copy-pasting sensitive text, etc.
2. The set of Relayers has at least one truly "honest" participant.
3. The set of Relayers is equal to the number of shares ($n$) of particular content.

### Content encryption and commitment

`Creator` splits $text$ in $n$ shares $s_1, \dots, s_n$ using Sharmir's Secret Sharing (SSR). After that, generates $n$ AES symmetric encryption keys $p_1, \dots, p_n$ and encrypts shares with
them to obtain $[s_1]_{p_1}, \dots, [s_n]_{p_n}$.

After the encryption, `Creator` submits shares to `Relayers`. They store each shares in IPFS and return CIDs $cid_1, \dots, cid_n$ to `Creator`.

`Creator` stores on blockhain CIDs and private keys, encrypted with that blockchain's key, creating a new NFT contract.

### Content buying and viewing

In order to buy a right to view content, `User` mints an NFT he is interested in.

Having an NFT, `User` can request all $n$ relayers to give him a share and restore original $text$. How would the request look like?

1. `User` signs that he is an owner of NFT and $i$, sends it to relayer number $i$.
2. Relayer requests blockchain to reencrypt him a particular $p_i, cid_i$ with his public key.
3. Relayer recieves share $[s_i]_{p_i}$, decrypts it with his private key and returns $s_i$ to `User`.

### Relayer rewards

We applied a straightforward incentivization mechainsm, where relayer is receiving daily rewards, based on the number of unique users who have requested data through him. To receive reward, 
relayer submits unique users with their signatures of content viewing.

## Implementation

We have four parts of this repo:

`/frontend` - blogging platform implementation, frontend
`/pstorage-node` - relayer's node, which is ran alongside to IPFS node
`/pstorage-sdk` - sdk to encrypt, SSR and connection to relayers
`zama` - smart contracts, implemented with fhEVM

### Frontend

Implemented in React, allows to submit and view blog posts. Uses `fhevmjs` to encrypt data with TFHE. Uses `ethers` to connect to blockchain. And uses `pstorage-sdk` to connect to relayers.

### Pstorage-Node

Node.js server implemented using `express.js`, which talks to `IPFS` node and handles frontend request.

### Pstorage-sdk

Typescript sdk, allows to speak with `pstorage-node`. Also uses Shamir's Secret Sharing under the hood.

### Zama

Two smart contracts,

- `fheBlog` - implements `ERC-721`, allows users to mint tokens which grant access to content viewing for them.
- `fheBlogFactory` - allows to instantiate new `fheBlog` contracts, which has to be done when the new blog is posted.
