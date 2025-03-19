import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../core/models/api-response.model';
import { User } from '../models/user.mode';
import { ApiService } from '../../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getUsers(params?: {
    page?: number;
    per_page?: number;
    search?: string;
  }): Observable<ApiResponse<User[]>> {
    return this.apiService.get<User[]>('users', params);
  }
  createUser(user: Partial<User>): Observable<ApiResponse<User>> {
    return this.apiService.post<User>('users/create', user);
  }

  updateUser(id: number, user: Partial<User>): Observable<ApiResponse<User>> {
    return this.apiService.put<User>(`users/update`, user);
  }

  deleteUser(id: number): Observable<ApiResponse<void>> {
    return this.apiService.delete<void>(`users/delete`, { id: id });
  }
}
