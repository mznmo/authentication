import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const expiration = localStorage.getItem("expiration");
  if (!expiration) {
    return null;
  }

  const expirationDate = new Date(expiration);
  const currentTime = new Date();

  const duration = expirationDate.getTime() - currentTime.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }
}
