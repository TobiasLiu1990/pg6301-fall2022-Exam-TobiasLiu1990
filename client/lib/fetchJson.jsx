//Error handling
export class HttpError extends Error {
  constructor(status, statusText) {
    super("Exception message will show here: " + statusText);
    this.status = status;
  }
}

//Reusable fetch
export async function fetchJSON(url, options = {}) {
  const res = await fetch(url, {
    method: options.method || "get",
    body: options.json && JSON.stringify(options.json),
    headers: options.json ? { "Content-Type": "application/json" } : {},
  });

  if (!res.ok) {
    throw new HttpError(res.status, res.statusText);
  }
  if (res.status === 200) {
    return await res.json();
  }
}
