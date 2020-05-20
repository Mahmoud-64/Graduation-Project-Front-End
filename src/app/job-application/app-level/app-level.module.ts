import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLevelListComponent } from './app-level-list/app-level-list.component';
import { AppLevelItemComponent } from './app-level-item/app-level-item.component';
import { AppLevelDetailsComponent } from './app-level-details/app-level-details.component';
import { AppLevelComponent } from './app-level.component';



@NgModule({
  declarations: [AppLevelListComponent, AppLevelItemComponent, AppLevelDetailsComponent, AppLevelComponent],
  imports: [
    CommonModule
  ],
  exports: [AppLevelListComponent, AppLevelItemComponent, AppLevelDetailsComponent, AppLevelComponent],
})
export class AppLevelModule { }
