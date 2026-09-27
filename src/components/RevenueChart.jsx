import { useMemo, useState } from "react";

const weeklyRevenue = [
  { label: "Mon", revenue: 850 },
  { label: "Tue", revenue: 1200 },
  { label: "Wed", revenue: 950 },
  { label: "Thu", revenue: 1450 },
  { label: "Fri", revenue: 1100 },
  { label: "Sat", revenue: 700 },
  { label: "Sun", revenue: 550 },
];

const monthlyRevenue = [
  { label: "Jan", revenue: 8200 },
  { label: "Feb", revenue: 9100 },
  { label: "Mar", revenue: 7800 },
  { label: "Apr", revenue: 10500 },
  { label: "May", revenue: 11800 },
  { label: "Jun", revenue: 9700 },
  { label: "Jul", revenue: 12500 },
  { label: "Aug", revenue: 11200 },
  { label: "Sep", revenue: 13100 },
  { label: "Oct", revenue: 14500 },
  { label: "Nov", revenue: 13800 },
  { label: "Dec", revenue: 15200 },
];

export default function RevenueChart() {
  const [period, setPeriod] = useState("monthly");

  const data = period === "weekly" ? weeklyRevenue : monthlyRevenue;

  const totalRevenue = data.reduce((total, item) => total + item.revenue, 0);

  const maxRevenue = Math.max(...data.map((item) => item.revenue));

  const width = 800;
  const height = 320;

  const padding = {
    top: 30,
    right: 25,
    bottom: 50,
    left: 65,
  };

  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const yMax = Math.ceil(maxRevenue / 2000) * 2000;

  const points = useMemo(() => {
    return data.map((item, index) => {
      const x =
        data.length === 1
          ? padding.left + chartWidth / 2
          : padding.left + (index * chartWidth) / (data.length - 1);

      const y = padding.top + chartHeight - (item.revenue / yMax) * chartHeight;

      return {
        ...item,
        x,
        y,
      };
    });
  }, [data, chartWidth, chartHeight, yMax]);

  const linePoints = points.map((point) => `${point.x},${point.y}`).join(" ");

  const areaPoints = `
    ${padding.left},${padding.top + chartHeight}
    ${linePoints}
    ${padding.left + chartWidth},${padding.top + chartHeight}
  `;

  const gridCount = 5;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 ">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">Revenue</p>

          <h2 className="text-2xl font-bold text-blue-900 mt-1">
            ${totalRevenue.toLocaleString()}
          </h2>

          <p className="text-sm text-green-600 mt-1">Revenue overview</p>
        </div>

        {/* Period selector */}
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="
            border
            border-gray-200
            rounded-lg
            px-3
            py-2
            text-sm
            text-gray-600
            bg-white
            outline-none
            cursor-pointer
          "
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Chart */}
      <div className="mt-6 overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full min-w-[650px]"
        >
          {/* Grid */}
          {Array.from({ length: gridCount + 1 }).map((_, index) => {
            const value = (yMax / gridCount) * index;

            const y = padding.top + chartHeight - (value / yMax) * chartHeight;

            return (
              <g key={index}>
                <line
                  x1={padding.left}
                  x2={padding.left + chartWidth}
                  y1={y}
                  y2={y}
                  stroke="#e5e7eb"
                />

                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#9ca3af"
                >
                  ${Math.round(value / 1000)}k
                </text>
              </g>
            );
          })}

          {/* Area */}
          <polygon points={areaPoints} fill="#eff6ff" />

          {/* Line */}
          <polyline
            points={linePoints}
            fill="none"
            stroke="#2563eb"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((point) => (
            <g key={point.label}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="white"
                stroke="#2563eb"
                strokeWidth="3"
              />

              <text
                x={point.x}
                y={height - 18}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
              >
                {point.label}
              </text>

              {/* Revenue value */}
              <title>
                {point.label}: ${point.revenue.toLocaleString()}
              </title>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
