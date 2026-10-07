# 🪙 Moneta Pay

> A high-performance, gasless recurring billing protocol built natively for Monad’s Parallel EVM architecture. Submitted for the **Monad Metropolis Hackathon** (Consumer Products & Payments Track).

---

## 🚀 Hackathon Value Proposition & Strategy

### 1. The Problem
Traditional blockchains process transactions sequentially. When enterprise-scale subscription platforms attempt to process thousands of bills simultaneously on the 1st of the month, networks bottleneck, causing severe gas spikes and transaction failures.

### 2. The Monad Advantage (Parallel EVM)
Moneta Pay engineers its storage routing (`account -> merchant -> Subscription`) to eliminate state conflicts under Monad’s Parallel EVM. This allows thousands of distinct user billing operations to process concurrently within the exact same block with zero latency.

### 3. User Experience (Stripe-Alternative)
- **Embedded Passkeys / Social Login:** Zero seed-phrase friction via Privy/Biconomy SDKs.
- **1-Click Subscription Approval:** Users authorize an interval schedule once and walk away.
- **Gasless Automation:** Relayers and Paymasters execute monthly billing transparently with $0.00 gas fees for the user.

---

## 🛠️ Tech Stack & Architecture
- **Smart Contracts:** Solidity `0.8.23`, Hardhat, ERC-7579 Modular Validation, ERC-4337 Account Abstraction.
- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion, Lucide Icons.
- **Automation:** Node.js cron workers & Gelato Web3 Functions.

---

## 📦 Getting Started & Deployment

### 1. Install Dependencies
```bash
npm install
cd frontend && npm install && cd ..