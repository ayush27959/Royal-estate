import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaCoins,
  FaChartLine,
} from "react-icons/fa";

const ConstructionStageCard = ({ stage, percentage, icon: Icon }) => (
  <div className="relative flex flex-col items-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
      <Icon className="text-2xl" />
    </div>
    <p className="mt-3 text-sm font-bold text-zinc-900 dark:text-white text-center">
      {stage}
    </p>
    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
      {percentage}%
    </p>
  </div>
);

const BuildingProjectTimeline = ({ constructionStatus, completionDate }) => {
  const stages = [
    { name: "Planning", key: "planning", percentage: 20 },
    { name: "Foundation", key: "foundation", percentage: 40 },
    { name: "Structure", key: "structure", percentage: 60 },
    { name: "Finishing", key: "finishing", percentage: 80 },
    { name: "Ready", key: "ready", percentage: 100 },
  ];

  const currentStageIndex = stages.findIndex(
    (s) => s.key === constructionStatus
  );

  return (
    <div className="bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/10 p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          Project Timeline
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400">
          Expected completion:{" "}
          {new Date(completionDate).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-8">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex gap-4 items-start">
            {/* Connector */}
            {index < stages.length - 1 && (
              <div
                className={`absolute left-8 top-24 h-20 w-1 ${
                  index <= currentStageIndex
                    ? "bg-gradient-to-b from-yellow-500 to-yellow-600"
                    : "bg-zinc-300 dark:bg-zinc-700"
                }`}
              />
            )}

            {/* Dot */}
            <div className="relative z-10">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                  index <= currentStageIndex
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg scale-110"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {index <= currentStageIndex ? (
                  <FaCheckCircle />
                ) : (
                  index + 1
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-4">
              <h4
                className={`font-bold text-lg transition-colors ${
                  index <= currentStageIndex
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {stage.name}
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                {stage.percentage}% Complete
              </p>
              {index === currentStageIndex && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 font-semibold mt-2">
                  Current Stage
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2 mt-5">
              <div
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.max(
                    0,
                    Math.min(100, (stage.percentage / 100) * 100)
                  )}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuildingProjectTimeline;
