import React, { useState, useEffect } from "react";
import { FaCalculator, FaChartLine, FaCalendarAlt } from "react-icons/fa";

const InvestmentCalculator = ({ building }) => {
  const [investmentAmount, setInvestmentAmount] = useState(building?.price / 2 || 0);
  const [selectedStage, setSelectedStage] = useState(0);
  const [results, setResults] = useState(null);

  useEffect(() => {
    calculateReturns();
  }, [investmentAmount, selectedStage]);

  const calculateReturns = () => {
    if (!investmentAmount || !building) return;

    const roi = building.investmentReturn || 12;
    const totalReturn = (investmentAmount * roi) / 100;
    const annualReturn = totalReturn / ((building.paymentPlan?.length || 5) / 12);
    const monthlyReturn = annualReturn / 12;

    setResults({
      investmentAmount: parseFloat(investmentAmount),
      roi,
      totalReturn: parseFloat(totalReturn.toFixed(2)),
      annualReturn: parseFloat(annualReturn.toFixed(2)),
      monthlyReturn: parseFloat(monthlyReturn.toFixed(2)),
      totalValue: parseFloat((investmentAmount + totalReturn).toFixed(2)),
      timeline: building.paymentPlan?.length || 5,
    });
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl border border-yellow-200 dark:border-yellow-800/50 p-8">
      <div className="flex items-center gap-3 mb-6">
        <FaCalculator className="text-2xl text-yellow-600 dark:text-yellow-400" />
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Investment Calculator
        </h3>
      </div>

      {/* Investment Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-zinc-900 dark:text-white mb-3">
          Investment Amount
        </label>
        <div className="relative">
          <span className="absolute left-4 top-3 text-xl text-yellow-600 dark:text-yellow-400">
            ₹
          </span>
          <input
            type="number"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(parseFloat(e.target.value) || 0)}
            className="w-full pl-8 pr-4 py-3 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold text-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          />
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
          Total Project Cost: ₹{building?.price?.toLocaleString() || "N/A"}
        </p>
      </div>

      {/* Investment Slider */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={building?.price || 100000}
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(parseFloat(e.target.value))}
          className="w-full h-2 bg-yellow-200 dark:bg-yellow-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
        />
        <div className="flex justify-between text-xs text-zinc-600 dark:text-zinc-400 mt-2">
          <span>₹0</span>
          <span>₹{(building?.price / 2)?.toLocaleString() || "N/A"}</span>
          <span>₹{(building?.price)?.toLocaleString() || "N/A"}</span>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Top Stats Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                Expected ROI
              </p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {results.roi}%
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-1">
                Total Returns
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{results.totalReturn.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Income Breakdown */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
            <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-3">
              Income Breakdown
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-700 dark:text-zinc-300">Monthly Income</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  ₹{results.monthlyReturn.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-700 dark:text-zinc-300">Annual Income</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  ₹{results.annualReturn.toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-2" />
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-zinc-900 dark:text-white">
                  Total Investment Value
                </span>
                <span className="text-lg text-yellow-600 dark:text-yellow-400">
                  ₹{results.totalValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
            <div className="flex items-center gap-2 mb-3">
              <FaCalendarAlt className="text-yellow-600 dark:text-yellow-400" />
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase">
                Investment Timeline
              </p>
            </div>
            <p className="text-lg font-bold text-zinc-900 dark:text-white">
              {results.timeline} Months
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
              Payable in {building?.paymentPlan?.length || 5} stages
            </p>
          </div>

          {/* Payment Stages */}
          {building?.paymentPlan && building.paymentPlan.length > 0 && (
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-yellow-100 dark:border-yellow-900/50">
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase mb-3">
                Payment Schedule
              </p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {building.paymentPlan.map((stage, idx) => {
                  const stageAmount = (results.investmentAmount * stage.percentage) / 100;
                  return (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        selectedStage === idx
                          ? "bg-yellow-100 dark:bg-yellow-900/20"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                      onClick={() => setSelectedStage(idx)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {stage.stage}
                        </span>
                        <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded">
                          {stage.percentage}%
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        ₹{stageAmount.toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl p-4 text-center">
            <p className="text-sm font-semibold text-black mb-2">Ready to invest?</p>
            <button className="w-full px-4 py-2 bg-black text-yellow-400 font-bold rounded-lg hover:bg-zinc-900 transition-colors">
              Express Interest
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCalculator;
