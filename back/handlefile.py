from fastapi import APIRouter, UploadFile, File
from fastapi.responses import StreamingResponse
from typing import Union
import pandas as pd
import numpy as np
import io
import seaborn as sns
from matplotlib import pyplot as plt
from pathlib import Path

router = APIRouter()


@router.post("/datasets")
async def handleFile(file: UploadFile = File(...)):
    try:
        content = await file.read()
        file_ext = Path(file.filename).suffix.lower()

        match file_ext:
            case ".csv":
                file_io = io.StringIO(content.decode("utf-8"))
                data = pd.read_csv(file_io)
            # case ".xls"| ".xlsx":
            #     file_io = io.BytesIO(content)
            #     data=pd.read_excel(file_io)
            case _:
                return {
                    "status": "error",
                    "msg": f"Unsupported file type: {file_ext}"
                }

        data = data.dropna(axis=1, how="all")
        data = data.dropna(axis=0, how="all")
        data = data.fillna("")
        data_list = data.values.tolist()
        header = list(data.columns)
        row_count = data.shape[0]
        col_count = data.shape[1]

        return {
            "status": "success",
            "data": data_list,
            "rows": row_count,
            "cols": col_count,
            "header": header
        }

    except Exception as e:
        return {
            "status": "error",
            "msg": str(e)
        }


@router.get("/hell")
def get():
    return {"dance": 123}
