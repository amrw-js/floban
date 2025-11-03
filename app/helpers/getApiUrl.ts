export const getApiUrl = () => {
  const env = process.env.NEXT_PUBLIC_CURRENT_ENV;

  switch (env) {
    case "development":
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;

    case "preview":
      return process.env.NEXT_PUBLIC_API_PREVIEW_BASE_URL;

    case "production":
      return (
        process.env.NEXT_PUBLIC_API_PROD_BASE_URL ||
        process.env.NEXT_PUBLIC_API_PREVIEW_BASE_URL
      );

    default:
      return process.env.NEXT_PUBLIC_API_DEV_BASE_URL;
  }
};
