export const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://yourdomain.com"
    : "http://localhost:3000");
