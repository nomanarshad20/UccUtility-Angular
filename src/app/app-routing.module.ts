import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadingStrategy,
  PreloadAllModules
} from "@angular/router";



const routes: Routes = [
  {
    path: "scrapping",
loadChildren: "./Scrapping/my-tool/scrapping.module#ScrappingModule"
  }
];


//const routes: Routes = [];

//RouterModule.forRoot(routes)
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



