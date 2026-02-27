const BASE_URL = "http://localhost:8081/api";

const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // fetch DOES NOT throw on 4xx / 5xx
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API error");
  }

  // For DELETE (no body)
  if (response.status === 204) return null;

  return response.json();
};

export default apiFetch;
