function VerificationCard() {
  const issues = [
    {
      claim: "The capital of India is Mumbai.",
      truth: "Capital of India is New Delhi."
    },
    {
      claim: "Plants get nutrition from soil.",
      truth: "Plants produce food via photosynthesis."
    }
  ];

  return (
    <div className="mt-8">
      <h2 className="text-red text-lg font-semibold mb-4">
        Issues Found (2)
      </h2>

      <div className="space-y-4">
        {issues.map((issue, index) => (
          <div key={index} className="bg-black/20 rounded-2xl p-5">
            <h3 className="font-semibold">{issue.claim}</h3>
            <p className="text-muted mt-2">{issue.truth}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VerificationCard;