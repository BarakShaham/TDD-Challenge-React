import { API_BASE } from "./config";

export default class ApiGateway {
  get = async (path: string) => {
    const response = await fetch(`${API_BASE}${path}`);
    const dto = response.json();
    return dto;
  };
  post = async (path: string, payload: {}) => {
    const response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload),
    });
    const dto = response.json();
    return dto;
  };
}
