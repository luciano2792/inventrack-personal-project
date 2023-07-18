const fetcher = async ({ url, method, body }: 
  {url: string, method: string, body: object}) => {
    const json = true;
    const res = await fetch(url, {
      method,
      ...(body && {body: JSON.stringify(body)}),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  
    if (!res.ok) {
      throw new Error("API Error");
    }
  
    if (json) {
      const data = await res.json();
      return data;
    }
};

export const register = async (user: object) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user
  });
};

export const signin = async (user: object) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user
  });
};