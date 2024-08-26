package com.demo.RealEstateManagementSystem.service.serviceIMP;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.RealEstateManagementSystem.exception.ResourceNotFoundException;
import com.demo.RealEstateManagementSystem.pojo.Property;
import com.demo.RealEstateManagementSystem.repository.PropertyRepository;
import com.demo.RealEstateManagementSystem.service.PropertyService;

import jakarta.persistence.EntityNotFoundException;



@Service
public class PropertyServiceIMP implements PropertyService {
	@Autowired
	private PropertyRepository propertyrepo;
	


	
	@Override
	public Property createProperty(Property property) {
		return propertyrepo.save(property);
	}

	@Override
	public Property deleteProperty(Long id) {
		Property existProperty = propertyrepo.findById(id).orElseThrow(
				()-> new ResourceNotFoundException("Property","id", id));
		propertyrepo.delete(existProperty);
		return existProperty;
	}

	@Override
	public Property updateProperty(Property property, Long id) {
		Property existProperty = propertyrepo.findById(id).orElseThrow(
				()->new ResourceNotFoundException("Property","id",id));
		existProperty.setLocation(property.getLocation());
		existProperty.setBedrooms(property.getBedrooms());
		existProperty.setBathrooms(property.getBathrooms());
		existProperty.setDescription(property.getDescription());
		existProperty.setPrice(property.getPrice());
		existProperty.setProptype(property.getProptype());
		existProperty.setLotSize(property.getLotSize());
		existProperty.setSquareFeet(property.getSquareFeet());
		
		propertyrepo.save(existProperty);
		return existProperty;
	}
	@Override
	 public List<Property> searchProperties(String location) {
	        return propertyrepo.findByLocation(location);
	 }

	@Override
	public List<Property> getAllProperties() {
		return propertyrepo.findAll();
	}

	 public void updatePropertyStatus(Long id, String avail) {
	        Property property = propertyrepo.findById(id)
	                .orElseThrow(() -> new EntityNotFoundException("Property not found"));
	        property.setAvail(avail);
	        propertyrepo.save(property);
	    }


}
