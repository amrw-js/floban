export const getApiUrl = () => {
  const env = process.env.NEXT_PUBLIC_CURRENT_ENV;

  switch (env) {
    case "development":
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;

    case "preview":
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;

    default:
      return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
};
