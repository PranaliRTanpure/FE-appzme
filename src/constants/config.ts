import { LogLevel } from "../services/common/logger.service";
import { ENVIRONMENTS } from "./environments";

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";
export const EXPIRY_KEY = "expiry";
export const ROLES_KEY = "roles";
export const ENV = import.meta.env.VITE_ENV;
export const LOG_LEVEL: LogLevel =
  ENV === ENVIRONMENTS.PRODUCTION ||
  ENV === ENVIRONMENTS.STAGE ||
  ENV === ENVIRONMENTS.UAT
    ? "warn"
    : "log";
