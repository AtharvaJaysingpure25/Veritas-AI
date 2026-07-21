function ScoreCircle() {
  return (
    <div className="relative w-40 h-40">
      <svg className="w-40 h-40 rotate-[-90deg]">
        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#1f2937"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#22C55E"
          strokeWidth="10"
          fill="none"
          strokeDasharray="408"
          strokeDashoffset="65"
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold">84</h2>
        <p className="text-muted text-sm">/100</p>
      </div>
    </div>
  );
}

export default ScoreCircle;