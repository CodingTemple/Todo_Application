import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  {
    path: 'login', loadChildren: () => import ('./user/user.module').then(module => module.UserModule)
  },
  {
    path: 'todo', 
    component: TodoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
