// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {CertificateReceipt} from "../src/CertificateReceipt.sol";

/// Foundry entry: `forge script script/Deploy.s.sol --rpc-url fuji --broadcast`
/// Requires forge-std. The repo also deploys via `npx tsx spike/deploy-receipt.ts`.
contract DeployCertificateReceipt {
    function deploy(address recorder) external returns (CertificateReceipt) {
        return new CertificateReceipt(recorder);
    }
}
