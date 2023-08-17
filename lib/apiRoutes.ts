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

export const createInventory = async (data: object) => {
  return fetcher({
    url: "/api/inventory/create",
    method: "POST",
    body: data
  });
}

export const updateInventory = async (data: object) => {
  return fetcher({
    url: "/api/inventory/update",
    method: "POST",
    body: data
  });
}

export const getInventory = async (data: object) => {
  return fetcher({
    url: "/api/inventory/get",
    method: "POST",
    body: data
  });
}

export const getInventories = async (data: object) => {
  return fetcher({
    url: "/api/inventory/getMany",
    method: "POST",
    body: data
  });
}

export const deleteInventory = async (data: object) => {
  return fetcher({
    url: "/api/inventory/delete",
    method: "POST",
    body: data
  });
}