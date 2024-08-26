package com.demo.RealEstateManagementSystem.service;


import java.util.List;

import com.demo.RealEstateManagementSystem.pojo.Transaction;
public interface TransactionService {
    Transaction createTransaction(Transaction transaction);

	List<Transaction> getAllTransactions();
}
