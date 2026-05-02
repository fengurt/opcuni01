export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// 统一走 Logto 认证流程
export const getLogtoLoginUrl = () => `/api/logto/sign-in`;
export const getLogtoSignOutUrl = () => `/api/logto/sign-out`;
export const getLoginUrl = getLogtoLoginUrl;
