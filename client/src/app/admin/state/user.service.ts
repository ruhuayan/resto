import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Area, PasswordPayload, User } from "../admin.models";
import { API_URL } from "../../models/shared.models";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private http: HttpClient) {}

	login(user: User) {
		return this.http.post<any>(`${API_URL}/users/login`, user);
	}

  logout() {
    return this.http.get(`${API_URL}/users/logout`);
  }

	changePassword(user: PasswordPayload) {
		return this.http.post<any>(`${API_URL}/users/change-password`, user, this.getOptions(user.token))
	}

	getUsers(token: string) {
		return this.http.get<any>(`${API_URL}/users`,  this.getOptions(token));
	}

	createUser(user: User) {
		return this.http.post<any>(`${API_URL}/register`, user);
	}

	deleteUser(id: string, token: string) {
		return this.http.delete<any>(`${API_URL}/users/${id}`,  this.getOptions(token));
	}

	getTables(token: string) {
		return this.http.get<any>(`${API_URL}/tables`,  this.getOptions(token));
	}
	deleteTable(id: string, token: string) {
		return this.http.delete<any>(`${API_URL}/tables/${id}`,  this.getOptions(token));
	}

	getAreas(token: string) {
		return this.http.get<any>(`${API_URL}/areas`,  this.getOptions(token));
	}
	createArea(area: Area, token: string) {
		return this.http.post<any>(`${API_URL}/areas`, area, this.getOptions(token));
	}
	deleteArea(id: string, token: string) {
		return this.http.delete<any>(`${API_URL}/areas/${id}`,  this.getOptions(token));
	}

	private getOptions(token: string) {
		return {                                                                                                                                                                                 
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
  			'Accept': 'application/json',
				'Authorization': `Basic ${token}`, 
			}), 
		};
	}
}
