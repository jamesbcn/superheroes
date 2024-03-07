import { NgModule } from '@angular/core';
import { SafeDataSourcePipe } from './safe-data-source.pipe';

@NgModule({
  declarations: [SafeDataSourcePipe],
  exports: [SafeDataSourcePipe]
})
export class SafeDataSourceModule { }