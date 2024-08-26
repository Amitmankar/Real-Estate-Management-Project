package com.demo.RealEstateManagementSystem.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value=HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

	private String resourceName;
	private String fieldname;
	private Long fieldvalue;
	public ResourceNotFoundException(String resourceName, String fieldname, Long id) {
		super(String.format(resourceName,fieldname,id,"%s resource not found %s :%s"));
		this.resourceName = resourceName;
		this.fieldname = fieldname;
		this.fieldvalue = id;
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getFieldname() {
		return fieldname;
	}
	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}
	public Long getFieldvalue() {
		return fieldvalue;
	}
	public void setFieldvalue(Long fieldvalue) {
		this.fieldvalue = fieldvalue;
	}

	
}
