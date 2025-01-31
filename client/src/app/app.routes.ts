import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { checkMachineGuard } from "./state/check-machine.guard";
import { AuthGuard } from "./admin/state/auth.guard";

export const routes: Routes = [
	{ path: "",
		component: HomeComponent,
		title: "Resto Home" },
	{
		path: "login",
		component: LoginComponent,
		title: 'User Login'
	},
  {
		path: "admin",
		loadChildren: () => import('./admin/admin.routes').then(mod => mod.ADMIN_ROUTES),
		canActivate: [AuthGuard()]
	}
];
