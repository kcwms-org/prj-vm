export default class ApiService<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    if (!response.ok) {
      throw new Error(`GET request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async post(endpoint: string, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`POST request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async put(endpoint: string, data: T): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`PUT request failed: ${response.statusText}`);
    }
    return response.json();
  }

  async delete(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`DELETE request failed: ${response.statusText}`);
    }
    return response.json();
  }
}