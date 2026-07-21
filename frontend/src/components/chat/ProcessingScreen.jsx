import { Loader2 } from "lucide-react";

function ProcessingScreen({ stage = 0 }) {
  const steps = [
    "Extracting text...",
    "Detecting claims...",
    "Searching trusted sources...",
    "Generating report...",
  ];

  const progress = [25, 50, 75, 100];

  return (
    <div className="w-full flex items-center justify-center py-6 md:py-10 px-3 md:px-6">
      <div className="bg-card rounded-2xl md:rounded-3xl p-5 md:p-10 w-full max-w-[750px] shadow-2xl border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Loader2
            className="animate-spin text-accent"
            size={28}
          />
          <h2 className="text-xl md:text-3xl font-bold">
            Verifying Content...
          </h2>
        </div>

        {/* Overall Progress */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between mb-2 text-sm md:text-base">
            <span className="text-muted">Overall Progress</span>
            <span className="font-semibold">
              {progress[stage] || 0}%
            </span>
          </div>

          <div className="w-full h-3 md:h-4 bg-black/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-700"
              style={{
                width: `${progress[stage] || 0}%`,
              }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-5 md:space-y-6">
          {steps.map((step, index) => {
            const completed = index < stage;
            const active = index === stage;

            return (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <p
                    className={`text-sm md:text-base font-medium ${
                      completed
                        ? "text-green-400"
                        : active
                        ? "text-white"
                        : "text-muted"
                    }`}
                  >
                    {step}
                  </p>

                  {completed && (
                    <span className="text-green-400">✓</span>
                  )}

                  {active && (
                    <Loader2
                      size={16}
                      className="animate-spin text-accent"
                    />
                  )}
                </div>

                <div className="w-full h-2 md:h-3 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      completed || active
                        ? "bg-accent"
                        : "bg-transparent"
                    }`}
                    style={{
                      width: completed
                        ? "100%"
                        : active
                        ? "70%"
                        : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProcessingScreen;