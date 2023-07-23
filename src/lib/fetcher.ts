export interface ErrorInfo extends Error {
  status: number;
  info: any;
}

async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    (error as ErrorInfo).status = res.status;
    (error as ErrorInfo).info = await res.json();

    throw error;
  }

  return res.json();
}

export default fetcher;
