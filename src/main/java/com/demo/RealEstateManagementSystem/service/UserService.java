package com.demo.RealEstateManagementSystem.service;

import java.util.List;

import com.demo.RealEstateManagementSystem.pojo.Property;
import com.demo.RealEstateManagementSystem.pojo.User;

public interface UserService {

    public List<User> getAllUsers(User users);
    public User createUser(User user);
    public User updateUser(User user,Long id);
    public void deleteUser(Long id);
    public void addPropertyToAgent(Long agentId, Property property);
    public List<Property> getPropertiesByAgent(Long agentId);
    public User authenticateUser(String email, String password,String type); 
}
