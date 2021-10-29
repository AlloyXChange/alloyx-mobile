# Investor Interface for AlloyX

## Summary

AlloyX locks together tokenized bonds issued on Ethereum and emits ETF tokens on Celo, a mobile first low-cost EVM chain. AlloyX ETF tokens are deployed on liquidity pools, support fractional staking and provide low transaction costs to create liquid markets for KYCed investors seeking fairly priced institutional grade investment opportunities.

The AlloyX protocol has two core participants: investors and borrowers.

Investors can invest in AlloyX ETF tokens to earn payments in stable coins on a regular schedule. They seek liquid institutional grade investments into a high yield asset un-correlated with Bitcoin that also earn them rewards in utility tokens.

Borrowers raise capital to finance their activity. They typically work with an established issuance protocol to put their debt on a smart contract, and pay the interest and the principal via the issuance protocol.

AlloyX creates diversified and liquid pooled investment tokens. AlloyX handles investments in the individual corporate bonds that form the index, collects payments and distributes them to investors. AlloyX also ensures that there is a liquid secondary market for the pooled investment tokens via liquidity pools.

## AlloyX Mobile

This repository contains the frontend for the investor experience. We have integrated with @celo-tools/use-contractkit to enable wallet access. From this interface, investors can browse and purchase Pooled Investments on the Celo network.

![alt text](https://storage.googleapis.com/cauris_deep_dive/alloyx_mobile4.png?t=1)

## Running the app

First run `yarn` and to install the project dependencies. To run the app locally, run `yarn start`.
