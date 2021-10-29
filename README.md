# Investor Interface for AlloyX

## Summary

AlloyX is a protocol that allows for the safe transfer of ERC20s from one EVM network to another. With a time locked vault the protocol enables user generated bundles of whitelisted ERC20s.
Vaults can hold a collection of ERC20s and at maturity, payout a distribution to the destination chain token holders. The payout amounts are determined by the destination token holder's proportion of the overall supply. The vault operator is responsible for redemptions in both vault types.

This repository contains the frontend for the investor experience. We have integrated with @celo-tools/use-contractkit to enable wallet access. From this interface, investors can browse and purchase Pooled Investments on the Celo network.
