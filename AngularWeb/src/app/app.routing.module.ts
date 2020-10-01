import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth.routing';


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
