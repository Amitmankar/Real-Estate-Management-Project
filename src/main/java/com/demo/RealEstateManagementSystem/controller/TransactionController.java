package com.demo.RealEstateManagementSystem.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.RealEstateManagementSystem.pojo.Transaction;
import com.demo.RealEstateManagementSystem.service.TransactionService;
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
	
	
	@GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

	@PostMapping
	public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transactionRequest) {
	    // Validate and process the input
	    try {
	        // Generate a random transaction ID
	        String transactionId = UUID.randomUUID().toString();
	        
	        // Create a Transaction object from the request
	        Transaction transaction = new Transaction();
	        transaction.setClientId(transactionRequest.getClientId());
	        transaction.setClientName(transactionRequest.getClientName());
	        transaction.setTransactionId(transactionId);
	        transaction.setAmount(transactionRequest.getAmount());
	        transaction.setPropertyId(transactionRequest.getPropertyId());

	        // Save the transaction using the service
	        Transaction savedTransaction = transactionService.createTransaction(transaction);

	        // Return a 200 OK response with the saved transaction
	        return ResponseEntity.ok(savedTransaction);

	    } catch (Exception e) {
	        // Handle exceptions and return a 400 Bad Request or other appropriate status
	        return ResponseEntity.badRequest().body(null);
	    }
	}

}
