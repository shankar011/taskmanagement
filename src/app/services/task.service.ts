import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://ce6c-103-174-35-54.ngrok-free.app';  // Update API URL as necessary

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Get all tasks
  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/alltasks`).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new task
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/addtask`, task, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing task
  updateTask(task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatetask/${task.id}`, task, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletetask/${id}`, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
