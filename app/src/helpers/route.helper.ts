type QueryType = {
  [key: string]: string;
};

export const addQueryPArameters = (url: string, query: QueryType) => {
  Object.keys(query).forEach((key) => {
    if (url.includes('?')) {
      url += '&' + key + '=' + query[key];
    } else {
      url += '?' + key + '=' + query[key];
    }
  });

  return url;
};
