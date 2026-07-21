import ScoreCircle from "./ScoreCircle";
import SourceBadges from "./SourceBadges";
import IssueAccordion from "./IssueAccordion";

function SummaryCard() {
  return (
    <div className="card p-8 rounded-3xl">
      <div className="grid grid-cols-5 gap-5 items-center">
        <ScoreCircle />

        <div className="bg-black/20 p-4 rounded-xl">
          <p className="text-muted text-sm">Claims</p>
          <h2 className="text-3xl font-bold">25</h2>
        </div>

        <div className="bg-black/20 p-4 rounded-xl">
          <p className="text-muted text-sm">Verified</p>
          <h2 className="text-3xl font-bold text-green">20</h2>
        </div>

        <div className="bg-black/20 p-4 rounded-xl">
          <p className="text-muted text-sm">Refuted</p>
          <h2 className="text-3xl font-bold text-red">3</h2>
        </div>

        <div className="bg-black/20 p-4 rounded-xl">
          <p className="text-muted text-sm">No Evidence</p>
          <h2 className="text-3xl font-bold text-yellow">2</h2>
        </div>
      </div>

      <SourceBadges />
      <IssueAccordion />
    </div>
  );
}

export default SummaryCard;