package com.demo.RealEstateManagementSystem.controller;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.RealEstateManagementSystem.pojo.Property;
import com.demo.RealEstateManagementSystem.service.PropertyService;




@RestController
@RequestMapping("/api")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping("/properties")
    public Property createProperty(@RequestBody Property property) {
        return propertyService.createProperty(property);
    }

    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updateProperty(@PathVariable Long id, @RequestBody Property property) {
        Property updatedProperty = propertyService.updateProperty(property, id);
        return ResponseEntity.ok(updatedProperty);
    }

    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Object> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/properties/search")
    public List<Property> searchProperties(@RequestParam String location) {
        List<Property> properties = propertyService.searchProperties(location);
        return properties.stream()
                .peek(property -> {
                    if (property.getImage() != null) {
                        property.setImageString(Base64.getEncoder().encodeToString(property.getImage()));
                    }
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        List<Property> allProperties = propertyService.getAllProperties();
        return allProperties.stream()
                .peek(property -> {
                    if (property.getImage() != null) {
                        property.setImageString(Base64.getEncoder().encodeToString(property.getImage()));
                    }
                })
                .collect(Collectors.toList());
    }
    @PutMapping("/properties/{id}/update-status")
    public ResponseEntity<?> updatePropertyStatus(@PathVariable Long id, @RequestParam String avail) {
        try {
            propertyService.updatePropertyStatus(id, avail);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    
    
}

