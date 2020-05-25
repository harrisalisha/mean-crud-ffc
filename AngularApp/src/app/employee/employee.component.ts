import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//inorder to work we have to import employee.sevice
// make n put in providers, then add in constructor
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

//we going to use toast from materialize so we must declare
declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  //
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  constructor(public employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();

  }

  resetForm(form? :NgForm) {
    if(form) 
      form.reset();
    this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        office: "",
        position: "",
        salary: null
      };  
    
  }
  // we can pass employeService.post n pass form value
  //we have to deal with submit n update
  onSubmit(form: NgForm){
    if(form.value._id == ""){
    this.employeeService.postEmployee(form.value)
      .subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList(); 
        M.toast({html: 'save successfully', classes: 'rounded'});
      });
    }
    else{
      this.employeeService.putEmployee(form.value)
      .subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({html: 'update successfully', classes: 'rounded'});
      });
    }


  }


  //inorder to load datas from database, call getemployeeList from employeeService
  //make function
  refreshEmployeeList() {
    this.employeeService.getEmployeeList()
       .subscribe( (res) => {
         this.employeeService.employees = res as Employee[];
       })
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm){
    if(confirm('are you sure to delete this record?') == true){
      this.employeeService.deleteEmployee(_id)
      .subscribe((res) =>{
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({html: 'Delete successfully', classes: 'rounded'});
      })
    }
  }



}
