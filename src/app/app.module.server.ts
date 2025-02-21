import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { serverRoutes } from './app.routes.server';  // Import your server routes configuration

@NgModule({
  imports: [AppModule, ServerModule],  // Import AppModule and ServerModule for SSR
  providers: [provideServerRouting(serverRoutes)],  // Provide SSR routing
  bootstrap: [AppComponent],  // Bootstrap the app
})
export class AppServerModule {}  // Export AppServerModule