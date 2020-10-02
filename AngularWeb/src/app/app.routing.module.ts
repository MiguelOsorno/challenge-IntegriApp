import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule,
        PagesRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
