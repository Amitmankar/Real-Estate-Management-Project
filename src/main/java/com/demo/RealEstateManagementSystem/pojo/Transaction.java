package com.demo.RealEstateManagementSystem.pojo;
import jakarta.persistence.Column;
//import java.util.List;
//
//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // Marks this class as a JPA entity
public class Transaction {

    @Id // Marks this field as the primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates ID
    private Long id; // Unique ID for each transaction

    @Column(name = "client_id", nullable = false) // Maps to column 'client_id' in the database
    private Long clientId; // ID of the client making the transaction

    @Column(nullable = false) // Maps to column 'client_name' in the database
    private String clientName; // Name of the client

    @Column(name = "transaction_id", unique = true, nullable = false) // Ensures unique transaction ID
    private String transactionId; // Randomly generated transaction ID

    @Column(nullable = false) // Maps to column 'amount' in the database
    private Double amount; // Transaction amount

    @Column(name = "property_id", nullable = false) // Maps to column 'property_id' in the database
    private Long propertyId; // ID of the property being bought

    // Constructors, getters, and setters

    public Transaction() {
    }

    public Transaction(Long clientId, String clientName, String transactionId, Double amount, Long propertyId) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.transactionId = transactionId;
        this.amount = amount;
        this.propertyId = propertyId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Long getPropertyId() {
        return propertyId;
    }

    public void setPropertyId(Long propertyId) {
        this.propertyId = propertyId;
    }
}


