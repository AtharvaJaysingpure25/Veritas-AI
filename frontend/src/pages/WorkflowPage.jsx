function WorkflowPage() {
  const steps = [
    "Input Upload",
    "Fact Verification",
    "Score Generation",
    "Report Output"
  ];

  return (
    <div className="min-h-screen bg-bgPrimary text-white px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 md:mb-12">
        How Veritas AI Works
      </h1>

      <div className="space-y-4 md:space-y-6 max-w-4xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-card p-4 md:p-6 rounded-2xl border border-accent text-sm sm:text-base md:text-lg"
          >
            {index + 1}. {step}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowPage;