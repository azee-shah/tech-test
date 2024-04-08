import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environment';
import { APP_CONFIG } from './config';

environment.then(env => {
    platformBrowserDynamic([
      {
        provide: APP_CONFIG,
        useValue: env,
      },
    ])
      .bootstrapModule(AppModule)
      .catch(err => console.error(err));
});