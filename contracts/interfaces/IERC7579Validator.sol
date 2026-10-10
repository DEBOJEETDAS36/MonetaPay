// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IERC7579Validator {
    function validateUserOp(bytes32 userOpHash, bytes calldata data) external returns (uint256 validationData);
}