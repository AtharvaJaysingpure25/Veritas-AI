class ReportGenerator:

    def generate(self, results):

        supported = 0
        refuted = 0
        nei = 0
        total=len(results)

        for result in results:

            verdict = result["verdict"]

            if verdict == "SUPPORTED":
                supported += 1

            elif verdict == "REFUTED":
                refuted += 1

            else:
                nei += 1

        report = {
            "summary": {
                "total_claims": len(results),
                "supported": supported,
                "refuted": refuted,
                "not_enough_info": nei,
                "support_rate": round(supported / total * 100, 2) if total > 0 else 0,
                "refute_rate": round(refuted / total * 100, 2) if total > 0 else 0,
                "nei_rate": round(nei / total * 100, 2) if total > 0 else 0
            },
            "claims": results
        }

        return report