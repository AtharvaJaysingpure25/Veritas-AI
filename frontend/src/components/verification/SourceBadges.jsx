function SourceBadges() {
  const sources = ["NCERT", "Wikipedia", "Britannica", "NASA", "+8 More"];

  return (
    <div className="flex gap-3 flex-wrap mt-6">
      {sources.map((source, index) => (
        <div
          key={index}
          className="px-4 py-2 bg-black/20 rounded-xl text-sm"
        >
          {source}
        </div>
      ))}
    </div>
  );
}

export default SourceBadges;