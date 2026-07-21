function IssueAccordion() {
  const issues = [
    {
      claim: "The capital of India is Mumbai.",
      evidence: "The capital of India is New Delhi.",
      source: "NCERT Class 6",
    },
    {
      claim: "Great Wall is visible from Moon.",
      evidence: "It is not visible to naked eye.",
      source: "NASA Mythbusters",
    },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-red text-xl font-semibold mb-4">
        Issues Found (2)
      </h2>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="bg-black/20 rounded-2xl p-5">
            <div className="flex justify-between">
              <h3 className="font-semibold">{issue.claim}</h3>
              <span className="bg-red/20 text-red px-3 py-1 rounded-lg">
                False
              </span>
            </div>

            <p className="text-muted mt-3">
              Evidence: {issue.evidence}
            </p>

            <p className="text-sm mt-2 text-accent">
              Source: {issue.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IssueAccordion;