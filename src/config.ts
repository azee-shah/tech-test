import { InjectionToken } from "@angular/core";

export interface AppConfig {
  serverUrl: string
}

export const APP_CONFIG = new InjectionToken<AppConfig>("app_config");