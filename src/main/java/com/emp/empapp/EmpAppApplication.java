package com.emp.empapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class EmpAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmpAppApplication.class, args);
	}

}
