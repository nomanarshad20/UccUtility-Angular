import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  PreloadingStrategy,
  PreloadAllModules
} from "@angular/router";



const routes: Routes = [
  {
    path: "",
loadChildren: "./Scrapping/my-tool/scrapping.module#scrapping"
  }
];


//const routes: Routes = [];

//RouterModule.forRoot(routes)
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




