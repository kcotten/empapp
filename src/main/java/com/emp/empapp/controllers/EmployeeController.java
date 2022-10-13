package com.emp.empapp.controllers;

import javax.validation.Valid;
import com.emp.empapp.models.Employee;
import com.emp.empapp.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    EmployeeRepository eRepository;

    @GetMapping("/emps")
    public List<Employee> getAllEmployee() {
        // List<Task> passengers = taskRepository.findAll(Sort.by(Sort.Direction.DESC,
        // "createdAt"));
        // Sort sortByCreatedAtDesc = new Sort.by(Sort.Direction.DESC, "createdAt");
        // return taskRepository.findAll(sortByCreatedAtDesc);
        return eRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    @PostMapping("/emps")
    public Employee createEmployee(@Valid @RequestBody Employee emp) {
        // emp.setCompleted(false);
        return eRepository.save(emp);
    }

    @GetMapping(value = "/emps/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") String id) {
        return eRepository.findById(id)
                .map(emp -> ResponseEntity.ok().body(emp))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping(value = "/emps/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable("id") String id,
            @Valid @RequestBody Employee emp) {
        return eRepository.findById(id)
                .map(empData -> {
                    empData.setFirstName(emp.getFirstName());
                    empData.setLastName(emp.getLastName());
                    Employee updatedEmp = eRepository.save(empData);
                    return ResponseEntity.ok().body(updatedEmp);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping(value = "/emps/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") String id) {
        return eRepository.findById(id)
                .map(emp -> {
                    eRepository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElse(ResponseEntity.notFound().build());
    }
}
