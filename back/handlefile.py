from fastapi import APIRouter,UploadFile,File
from fastapi.responses import StreamingResponse
from typing import Union
import pandas as pd
import numpy as np
import io
import seaborn as sns
from matplotlib import pyplot as plt
from pathlib import Path

router=APIRouter()

@router.post("/datasets")
async def handleFile(file:UploadFile=File(...)):
    try:
        content=await file.read()
        file_ext=Path(file.filename).suffix.lower()


        match file_ext:
            case ".csv":
                file_io=io.StringIO(content.decode("utf-8"))
                data=pd.read_csv(file_io)
            case ".xls"| ".xlsx":
                file_io = io.BytesIO(content)
                data=pd.read_excel(file_io)
            case _:
                return{
                    "status":"error",
                    "msg":f"Unsupported file type: {file_ext}"
                }


        column_ids = ["rowNumber"] + list(data.columns)
        columns = [{"columnId": col, "width": 100} for col in column_ids]
        columns[0]['width']=50
        header_row = {
        "rowId": "header",
        "cells":[{"type":"header","text":""}]+
                [{"type": "header", "text": col} for col in data.columns]
        }

        data_rows = []
        for i, row in data.iterrows():
            row_number_cell = {"type": "header", "text": str(i + 1)}
            cells = [{"type": "text", "text": str(cell)} for cell in row]
            data_rows.append({
                "rowId": i + 1,
                "cells": [row_number_cell]+cells})

        all_rows = [header_row] + data_rows

        return {
            "status":"success",
            "columns": columns,
            "rows": all_rows
            }

        # sns.set_theme(style="whitegrid")
        # plt.figure(figsize=(8,5))
        # sns.boxplot(data,x=data['Variable'],y=data['Group'],hue=data['Variable'],palette=["#00AFBB", "#E7B800", "#FC4E07", "#bb5100"],fill=False)
        # plt.title("something")

        # buf=io.BytesIO()
        # plt.savefig(buf,format="png")
        # plt.close()
        # buf.seek(0)

        # return StreamingResponse(buf,media_type="image/png")
    except Exception as e:
        return {
            "status":"error",
            "msg":str(e)
        }

@router.get("/hell")
def get():
    return{"dance":123}