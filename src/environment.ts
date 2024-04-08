import { AppConfig } from "./config";
export const environment: Promise<AppConfig> = Promise.resolve((window as any)?.env);