import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Employee } from './employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html'
})

export class EmpListComponent implements OnInit {
  employees: Employee[];
  newEmployee: Employee = new Employee;
  editing: boolean = false;
  editingEmployee: Employee = new Employee;

  constructor(
    private employeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeService.getEmployee()
      .then(emps => this.employees = emps );
    console.log();
  }

  createEmployee(employeeForm: NgForm): void {
    this.employeService.createEmployee(this.newEmployee)
      .then(createEmployee => {        
        employeeForm.reset();
        this.newEmployee = new Employee();
        this.employees.unshift(createEmployee)
      });
  }

  deleteEmployee(id: string): void {
    this.employeService.deleteEmployee(id)
    .then(() => {
      this.employees = this.employees.filter(employee => employee.id != id);
    });
  }

  updateEmployee(employeeData: Employee): void {
    console.log(employeeData);
    this.employeService.updateEmployee(employeeData)
    .then(updatedEmployee => {
      let existingEmployee = this.employees.find(employee => employee.id === updatedEmployee.id);
      Object.assign(existingEmployee, updatedEmployee);
      this.clearEditing();
    });
  }
  /*
  toggleCompleted(employeeData: Employee): void {
    employeeData.completed = !employeeData.completed;
    this.employeService.updateTask(employeeData)
    .then(updatedTask => {
      let existingTask = this.employee.find(task => task.id === updatedTask.id);
      Object.assign(existingTask, updatedTask);
    });
  }
  */
  editEmployee(employeeData: Employee): void {
    this.editing = true;
    Object.assign(this.editingEmployee, employeeData);
  }

  clearEditing(): void {
    this.editingEmployee = new Employee();
    this.editing = false;
  }
}
