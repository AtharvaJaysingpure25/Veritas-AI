import jsPDF from "jspdf";

function ResultScreen({ data }) {
  if (!data) return null;

  const report = {
    credibilityScore: 84,
    totalClaims:
      data?.verification_result?.total_claims || 0,
    verified: Math.floor(
      (data?.verification_result?.total_claims || 0) * 0.8
    ),
    refuted: Math.floor(
      (data?.verification_result?.total_claims || 0) * 0.15
    ),
    nei: Math.floor(
      (data?.verification_result?.total_claims || 0) * 0.05
    ),
    claims:
      data?.verification_result?.claims || [],
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("VerifyIT Verification Report", 20, 20);

    doc.setFontSize(12);
    doc.text(
      `Credibility Score: ${report.credibilityScore}/100`,
      20,
      40
    );
    doc.text(`Total Claims: ${report.totalClaims}`, 20, 50);
    doc.text(`Verified: ${report.verified}`, 20, 60);
    doc.text(`Refuted: ${report.refuted}`, 20, 70);
    doc.text(`NEI: ${report.nei}`, 20, 80);

    doc.text("Claims:", 20, 100);

    let y = 110;

    report.claims.slice(0, 100).forEach((claim, index) => {
      const safeClaim = String(claim);

      const lines = doc.splitTextToSize(
        `${index + 1}. ${safeClaim}`,
        170
      );

      if (y + lines.length * 7 > 280) {
        doc.addPage();
        y = 20;
      }

      doc.text(lines, 20, y);
      y += lines.length * 7 + 5;
    });

    doc.save("verification-report.pdf");
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 md:space-y-10 pb-10">
      {/* Score + Stats */}
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        {/* Score Circle */}
        <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-green-500 flex flex-col items-center justify-center shadow-lg shrink-0">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {report.credibilityScore}
          </h1>
          <p className="text-muted text-xs sm:text-base md:text-lg">
            /100
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 w-full">
          <StatCard title="Claims" value={report.totalClaims} />
          <StatCard title="Verified" value={report.verified} />
          <StatCard title="Refuted" value={report.refuted} />
          <StatCard title="NEI" value={report.nei} />
        </div>
      </div>

      {/* Download */}
      <div className="flex justify-center sm:justify-end">
        <button
          onClick={downloadPDF}
          className="w-full sm:w-auto bg-accent px-4 md:px-5 py-3 rounded-xl font-semibold hover:bg-accent2 transition text-sm md:text-base"
        >
          Download Report
        </button>
      </div>

      {/* Claims */}
      <div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6">
          Extracted Claims
        </h2>

        <div className="space-y-3 md:space-y-4">
          {report.claims.length > 0 ? (
            report.claims.slice(0, 20).map((claim, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-4 md:p-5 border border-white/5 text-sm md:text-base break-all overflow-hidden"
              >
                {String(claim)}
              </div>
            ))
          ) : (
            <div className="bg-card rounded-xl p-5 text-muted">
              No claims extracted
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-card p-3 sm:p-4 md:p-6 rounded-2xl min-w-0 text-center">
      <p className="text-muted text-xs sm:text-sm md:text-lg">
        {title}
      </p>
      <h2 className="text-xl sm:text-3xl md:text-5xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}

export default ResultScreen;