package com.demo.RealEstateManagementSystem.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.RealEstateManagementSystem.pojo.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByEmailAndPasswordAndType(String email, String password,String type);

}
