package com.demo.RealEstateManagementSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.RealEstateManagementSystem.pojo.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

}
