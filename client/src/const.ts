export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/** Set `VITE_OPC_UNI_HOME=true` when `/` should be the UNI page; full marketing home moves to `/global`. */
export const mainMarketingHomePath = import.meta.env.VITE_OPC_UNI_HOME === "true" ? "/global" : "/";

// 统一走 Logto 认证流程
export const getLogtoLoginUrl = () => `/api/logto/sign-in`;
export const getLogtoSignOutUrl = () => `/api/logto/sign-out`;
export const getLoginUrl = getLogtoLoginUrl;
