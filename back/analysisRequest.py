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

router = APIRouter()


@router.post("/analysis")
async def analysisRequest(
        file: UploadFile = File(...),
        analysisrequest: str = Form(...),
        activeHeader: str = Form(...)):
    try:
        content = await file.read()
        file_ext = Path(file.filename).suffix.lower()
        file_io = io.StringIO(content.decode("utf-8"))
        data = pd.read_csv(file_io)

        data = data.dropna(axis=1, how="all")
        data = data.dropna(axis=0, how="all")
        # data = data.fillna("")

        # columns_of_interest = json.loads(activeHeader)
        # columns_of_interest = [
        #     item for item in columns_of_interest if item.strip() != ""]
        columns_of_interest = [item for item in json.loads(
            activeHeader) if item.strip()]

        summary_data = {}

        for col in columns_of_interest:
            try:
                summary_data[col] = {
                    'N': data[col].count(),
                    'Missing': data[col].isna().sum(),
                    'Mean': data[col].mean(),
                    'Median': data[col].median(),
                    'SD': data[col].std(),
                    'Minimum': data[col].min(),
                    'Maximum': data[col].max()
                }
            except:
                summary_data[col] = {
                    'N': data[col].count(),
                    'Missing': data[col].isna().sum(),
                    'Mean': '',
                    'Median': '',
                    'SD': '',
                    'Minimum': '',
                    'Maximum': ''
                }

        # return {
        #     "hell": 123
        # }

        # for col in columns_of_interest:
        #     column_data = data[col]
        #     summary_data[col] = {
        #         'N': int(column_data.count()),
        #         'Missing': int(column_data.isna().sum()),
        #     }

        #     if pd.api.types.is_numeric_dtype(column_data):
        #         summary_data[col].update({
        #             'Mean': float(column_data.mean()),
        #             'Median': float(column_data.median()),
        #             'SD': float(column_data.std()),
        #             'Minimum': float(column_data.min()),
        #             'Maximum': float(column_data.max()),
        #         })
        #     else:
        #         summary_data[col].update({
        #             'Mean': '',
        #             'Median': '',
        #             'SD': '',
        #             'Minimum': '',
        #             'Maximum': '',
        #         })
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
