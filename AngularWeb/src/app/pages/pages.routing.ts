import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesCreateComponent } from './activities-create/activities-create.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'activities', component: ActivitiesComponent, canActivate: [ AuthGuard ] },
            { path: 'activities-create', component: ActivitiesCreateComponent, canActivate: [ AuthGuard ] },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
