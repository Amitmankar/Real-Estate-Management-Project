package com.demo.RealEstateManagementSystem.service.serviceIMP;

import com.demo.RealEstateManagementSystem.pojo.Transaction;
import com.demo.RealEstateManagementSystem.repository.TransactionRepository;
import com.demo.RealEstateManagementSystem.service.TransactionService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionServiceIMP implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Override
    public Transaction createTransaction(Transaction transaction) {
        Transaction savedTransaction = transactionRepository.save(transaction);

        return savedTransaction;
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}

