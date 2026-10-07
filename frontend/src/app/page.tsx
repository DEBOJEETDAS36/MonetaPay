"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Cpu, ArrowRight, CheckCircle2, Lock, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setLoading(false);
    }, 1000);
  };

  const handleSubscribe = (plan: string) => {
    setLoading(true);
    setTimeout(() => {
      setActivePlan(plan);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-monad-dark text-white selection:bg-monad-purple selection:text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-monad-border backdrop-blur-md sticky top-0 z-50 bg-monad-dark/80">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-monad-purple to-indigo-400 flex items-center justify-center shadow-lg shadow-monad-purple/20">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">Moneta <span className="text-monad-purple">Pay</span></span>
        </div>
        <div>
          {!isLoggedIn ? (
            <button
              onClick={handleLogin}
              className="bg-monad-purple hover:bg-purple-600 transition px-6 py-2.5 rounded-xl font-medium shadow-lg shadow-monad-purple/30 flex items-center space-x-2"
            >
              <span>{loading ? "Connecting Passkey..." : "Sign in with Passkey"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <div className="flex items-center space-x-3 bg-monad-card border border-monad-border px-4 py-2 rounded-xl">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-medium text-gray-300">0x71C...39aE (Smart Account)</span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-monad-purple/10 border border-monad-purple/30 px-4 py-1.5 rounded-full text-monad-purple text-xs font-semibold uppercase tracking-wider mb-6">
            <Cpu className="h-3.5 w-3.5" />
            <span>Powered by Monad Parallel EVM & ERC-7579</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            Stripe-Smooth Subscriptions, <span className="text-transparent bg-clip-text bg-gradient-to-r from-monad-purple to-indigo-300">Fully Gasless.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed">
            Approve your recurring billing schedule once with secure passkeys. Our decentralized automation worker handles monthly payments with zero popups and $0.00 gas fees.
          </p>
        </motion.div>

        {/* Pricing / Billing Simulator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plan 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-monad-card border border-monad-border rounded-2xl p-8 relative flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Pro SaaS Tier</h3>
                <span className="bg-monad-purple/20 text-monad-purple text-xs px-3 py-1 rounded-full font-semibold">Monthly</span>
              </div>
              <div className="text-4xl font-extrabold mb-6">$29<span className="text-gray-400 text-sm font-normal"> / month</span></div>
              <ul className="space-y-3 text-gray-300 mb-8 text-sm">
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-monad-purple" /><span>Gasless Autonomous Execution</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-monad-purple" /><span>ERC-7579 Strict Session Key Guard</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-monad-purple" /><span>Double-Charge Time-Lock Protection</span></li>
              </ul>
            </div>
            <button
              disabled={!isLoggedIn || activePlan === "Pro"}
              onClick={() => handleSubscribe("Pro")}
              className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2 ${
                activePlan === "Pro"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                  : isLoggedIn 
                  ? "bg-monad-purple hover:bg-purple-600 text-white shadow-lg shadow-monad-purple/30"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>{activePlan === "Pro" ? "Active Subscription" : isLoggedIn ? "Approve 1-Click Subscription" : "Connect Wallet First"}</span>
            </button>
          </motion.div>

          {/* Plan 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-monad-card border border-monad-border rounded-2xl p-8 relative flex flex-col justify-between shadow-xl"
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Enterprise AI Tier</h3>
                <span className="bg-indigo-500/20 text-indigo-400 text-xs px-3 py-1 rounded-full font-semibold">Monthly</span>
              </div>
              <div className="text-4xl font-extrabold mb-6">$99<span className="text-gray-400 text-sm font-normal"> / month</span></div>
              <ul className="space-y-3 text-gray-300 mb-8 text-sm">
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-indigo-400" /><span>Unlimited High-Frequency Billing</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-indigo-400" /><span>Priority Parallel EVM State Routing</span></li>
                <li className="flex items-center space-x-3"><CheckCircle2 className="h-4 w-4 text-indigo-400" /><span>Dedicated Merchant Paymaster Pool</span></li>
              </ul>
            </div>
            <button
              disabled={!isLoggedIn || activePlan === "Enterprise"}
              onClick={() => handleSubscribe("Enterprise")}
              className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center space-x-2 ${
                activePlan === "Enterprise"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 cursor-default"
                  : isLoggedIn 
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Lock className="h-4 w-4" />
              <span>{activePlan === "Enterprise" ? "Active Subscription" : isLoggedIn ? "Approve 1-Click Subscription" : "Connect Wallet First"}</span>
            </button>
          </motion.div>
        </div>

        {/* Live Parallel Execution Ticker */}
        <div className="mt-16 bg-monad-card border border-monad-border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="h-12 w-12 rounded-xl bg-monad-purple/10 border border-monad-purple/30 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-monad-purple animate-spin" />
            </div>
            <div>
              <h4 className="font-bold">Monad Parallel Pipeline Status</h4>
              <p className="text-sm text-gray-400">Processing 14,280 concurrent subscription UserOps in current block.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-400 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4" />
            <span>Zero State Conflicts Detected</span>
          </div>
        </div>
      </main>
    </div>
  );
}