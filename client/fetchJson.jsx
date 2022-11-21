//Error handling
export class HttpError extends Error {
  constructor(status, statusText) {
    super("My custom exception " + statusText);
    this.status = status;
  }
}

//Reusable fetch
export async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    //Check options method. Otherwise default is a get
    method: options.method || "get",
    headers: options.json ? { "content-type": "application/json" } : {},
    body: options.json && JSON.stringify(options.json),
  });

  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
  if (res.status === 200) {
    return await res.json();
  }
}
