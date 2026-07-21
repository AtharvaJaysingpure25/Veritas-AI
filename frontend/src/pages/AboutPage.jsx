function AboutPage() {
  return (
    <div className="min-h-screen bg-bgPrimary text-white px-4 sm:px-6 md:px-10 py-8 md:py-10">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8">
        About Veritas AI
      </h1>

      <div className="space-y-5 md:space-y-6 text-sm sm:text-base md:text-lg text-muted max-w-5xl leading-relaxed">
        <p>
          Veritas AI is an AI-powered educational fact verification system
          designed to combat misinformation in educational content.
        </p>

        <p>
          It verifies PDFs, text, and images by extracting claims,
          retrieving trusted sources using RAG, and checking factual correctness.
        </p>

        <p>Core features include:</p>

        <ul className="list-disc pl-5 md:pl-8 space-y-2">
          <li>Claim extraction</li>
          <li>Hallucination detection</li>
          <li>Bias detection</li>
          <li>Credibility scoring</li>
          <li>Citation generation</li>
        </ul>
      </div>
    </div>
  );
}

export default AboutPage;