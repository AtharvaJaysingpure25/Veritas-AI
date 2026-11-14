CORRECTION_PROMPT = """
You are an educational fact correction system.

Claim:
{claim}

Verdict:
{verdict}

Evidence:
{evidence}

Task:
If the claim is incorrect ,
generate a corrected educational statement
using only the provided evidence.

Return only the corrected statement.
And why the statement was wrong in case of Verdict:REFUTED.
"""