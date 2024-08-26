package com.demo.RealEstateManagementSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.demo.RealEstateManagementSystem.pojo.Property;


public interface PropertyRepository extends JpaRepository<Property, Long>{
	List<Property> findByLocation(String location);
	List<Property> findByAgentId(Long agentId);
}
