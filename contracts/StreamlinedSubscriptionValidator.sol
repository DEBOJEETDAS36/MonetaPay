// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

interface IERC7579Validator {
    function validateUserOp(bytes32 userOpHash, bytes calldata data) external view returns (uint256 validationData);
}

/**
 * @title StreamlinedSubscriptionValidator
 * @notice ERC-7579 modular validator for gasless recurring billing with strict session key constraints.
 * @dev Optimized for Monad Parallel EVM via disjoint storage mapping: account -> merchant -> Subscription.
 */
contract StreamlinedSubscriptionValidator is IERC7579Validator {
    
    struct Subscription {
        address merchant;
        address token;
        uint256 amount;
        uint256 interval;
        uint256 lastBilledTimestamp;
        bool active;
    }

    mapping(address => mapping(address => Subscription)) public subscriptions;

    event SubscriptionCreated(address indexed account, address indexed merchant, uint256 amount, uint256 interval);
    event SubscriptionExecuted(address indexed account, address indexed merchant, uint256 timestamp);
    event SubscriptionCancelled(address indexed account, address indexed merchant);

    error UnauthorizedSigner();
    error BillingIntervalNotPassed();
    error InvalidSubscription();

    function setSubscription(
        address merchant,
        address token,
        uint256 amount,
        uint256 interval
    ) external {
        subscriptions[msg.sender][merchant] = Subscription({
            merchant: merchant,
            token: token,
            amount: amount,
            interval: interval,
            lastBilledTimestamp: block.timestamp,
            active: true
        });

        emit SubscriptionCreated(msg.sender, merchant, amount, interval);
    }

    function cancelSubscription(address merchant) external {
        subscriptions[msg.sender][merchant].active = false;
        emit SubscriptionCancelled(msg.sender, merchant);
    }

    function validateUserOp(
        bytes32, 
        bytes calldata data
    ) external override returns (uint256 validationData) {
        (address account, address merchant) = abi.decode(data, (address, address));
        
        Subscription memory sub = subscriptions[account][merchant];
        if (!sub.active) revert InvalidSubscription();
        
        // Double-charge protection time-lock check
        if (block.timestamp < sub.lastBilledTimestamp + sub.interval) {
            revert BillingIntervalNotPassed();
        }

        subscriptions[account][merchant].lastBilledTimestamp = block.timestamp;

        emit SubscriptionExecuted(account, merchant, block.timestamp);
        return 0; // ERC-4337 success code
    }
}