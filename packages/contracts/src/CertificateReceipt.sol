// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Permanent public receipt on Avalanche C-Chain pointing at a real Carbonmark retirement.
contract CertificateReceipt {
    address public immutable recorder;

    struct Receipt {
        bytes32 sourceTx;
        string carbonmarkUrl;
        uint256 mgCO2e;
        address beneficiary;
        uint256 recordedAt;
    }

    uint256 public nextId;
    mapping(uint256 => Receipt) public receipts;

    event Recorded(
        uint256 indexed id,
        bytes32 indexed sourceTx,
        address indexed beneficiary,
        string carbonmarkUrl,
        uint256 mgCO2e
    );

    error NotRecorder();

    constructor(address recorder_) {
        recorder = recorder_;
    }

    function record(
        bytes32 sourceTx,
        string calldata carbonmarkUrl,
        uint256 mgCO2e,
        address beneficiary
    ) external returns (uint256 id) {
        if (msg.sender != recorder) revert NotRecorder();
        id = nextId++;
        receipts[id] = Receipt({
            sourceTx: sourceTx,
            carbonmarkUrl: carbonmarkUrl,
            mgCO2e: mgCO2e,
            beneficiary: beneficiary,
            recordedAt: block.timestamp
        });
        emit Recorded(id, sourceTx, beneficiary, carbonmarkUrl, mgCO2e);
    }
}
