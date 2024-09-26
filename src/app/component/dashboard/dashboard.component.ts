import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  task: Task = { title: '', description: '', completed: false };

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  // Fetch all tasks
  getAllTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Save a new or edited task
  saveTask(): void {
    if (this.task.id) {
      // If task has an id, update the task
      this.taskService.updateTask(this.task).subscribe(
        () => {
          this.getAllTasks();
          this.resetForm();
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      // Otherwise, create a new task
      this.taskService.addTask(this.task).subscribe(
        (newTask: Task) => {
          this.tasks.push(newTask);
          this.resetForm();
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
    }
  }

  // Edit a task
  editTask(task: Task): void {
    this.task = { ...task };  // Clone the task object for editing
  }

  // Delete a task
  deleteTask(id: string | undefined): void {
    if (id) {
      this.taskService.deleteTask(id).subscribe(
        () => {
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  // Reset the form
  resetForm(): void {
    this.task = { title: '', description: '', completed: false };
  }
}
