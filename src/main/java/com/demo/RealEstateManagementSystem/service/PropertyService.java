package com.demo.RealEstateManagementSystem.service;

import java.util.List;

import com.demo.RealEstateManagementSystem.pojo.Property;



public interface PropertyService {

	public List<Property> searchProperties(String location);
    public Property createProperty(Property property);
    public Property updateProperty(Property property,Long id);
    public Property deleteProperty(Long id);
    public List<Property> getAllProperties();
	public void updatePropertyStatus(Long id, String avail);
	
   

}
