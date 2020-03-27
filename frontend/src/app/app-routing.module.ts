import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';


const routes: Routes = [
  { path: 'questions', component: QuestionsComponent },
  { path: '', redirectTo: '/questions', pathMatch: 'full'},
  { path: '**', redirectTo: '/questions'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
