export const getAnalysis = async (
  csvString,
  analyisType = "Descriptives",
  variables = [],
  group = [],
  requested_analysis = ["n", "mean", "median", "sd", "missing"]
) => {
  const formData = new FormData();
  const file = new Blob([csvString], { type: "text:csv" });
  formData.append("file", file);
  formData.append("analysis_type", analyisType);
  formData.append("variables", JSON.stringify(variables));
  formData.append("group", JSON.stringify(group));
  formData.append("requested_analysis", JSON.stringify(requested_analysis));
  const response = await fetch("http://127.0.0.1:8000/analysis", {
    method: "post",
    body: formData,
  });
  const res = await response.json();
  return res;
};
