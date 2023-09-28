import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { remoteRoutes } from './entry.routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(remoteRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class RemoteEntryModule {}
