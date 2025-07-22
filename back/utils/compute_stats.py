def compute_stats(series, requested_analysis):
    result = {}
    for key in requested_analysis:
        try:
            if key == 'n':
                result['n'] = int(series.count())
            elif key == 'missing':
                result['missing'] = int(series.isna().sum())
            elif key == 'mean':
                result['mean'] = round(series.mean(), 2)
            elif key == 'median':
                result['median'] = round(series.median(), 2)
            elif key == 'sd':
                result['sd'] = round(series.std(), 2)
            elif key == 'sum':
                result['sum'] = round(series.sum(), 2)
            elif key == 'min':
                result['min'] = round(series.min(), 2)
            elif key == 'max':
                result['max'] = round(series.max(), 2)
        except (TypeError, ValueError):
            if key == 'n':
                result['n'] = int(series.count())
            elif key == 'missing':
                result['missing'] = int(series.isna().sum())
            else:
                result[key] = ''
    return result
