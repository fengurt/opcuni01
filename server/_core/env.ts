export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // OAuth / Session
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "opc-global-default-secret",
  // Logto 认证
  logtoEndpoint: process.env.LOGTO_ENDPOINT ?? "",
  logtoAppId: process.env.LOGTO_APP_ID ?? "",
  logtoAppSecret: process.env.LOGTO_APP_SECRET ?? "",
  logtoCookieSecret: process.env.LOGTO_COOKIE_SECRET ?? "opc-global-default-secret",
};
