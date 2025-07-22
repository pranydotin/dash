from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from typing import Union
import pandas as pd
import numpy as np
import io
import seaborn as sns
from matplotlib import pyplot as plt
from pathlib import Path
import json
from utils.compute_stats import compute_stats

router = APIRouter()


@router.post("/analysis")
async def analysisRequest(
        file: UploadFile = File(...),
        analysis_type: str = Form(...),
        variables: str = Form(...),
        group: str = Form(...),
        requested_analysis: str = Form(...)):

    try:
        content = await file.read()
        # file_ext = Path(file.filename).suffix.lower()
        file_io = io.StringIO(content.decode("utf-8"))
        data = pd.read_csv(file_io)

        data = data.dropna(axis=1, how="all")
        data = data.dropna(axis=0, how="all")

        variables = [item for item in json.loads(variables) if item.strip()]
        group = json.loads(group)
        requested_analysis = json.loads(requested_analysis)

        analysis_type = analysis_type

        if not variables:
            summary_df = pd.DataFrame({'Descriptives': requested_analysis})

        else:
            summary_rows = []

            if group:
                grouped = data.groupby(group)
                # return {
                #     "data": data,
                #     "group": group
                # }

                for group_keys, group_df in grouped:
                    group_label = (
                        ' | '.join(map(str, group_keys)) if isinstance(group_keys, tuple)
                        else str(group_keys)
                    )
                    for var in variables:
                        stats = compute_stats(
                            group_df[var], requested_analysis)
                        row = {'Variable': var, "group": group_label, **stats}
                        summary_rows.append(row)

            else:
                # Group is not used — don't include 'Group' key
                for var in variables:
                    stats = compute_stats(data[var], requested_analysis)
                    row = {'Variable': var, **stats}
                    summary_rows.append(row)

            summary_df = pd.DataFrame(summary_rows)

        json_data = summary_df.to_json(orient="records")

        # Return the result
        return {
            "status": "success",
            "summary": summary_df.fillna("").to_dict(),
            "json_data": json_data
        }

        summary = pd.DataFrame(summary_data)
        return {
            "status": "success",
            "summary": summary.fillna("").to_dict()
        }

    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }
