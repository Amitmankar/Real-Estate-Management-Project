package com.demo.RealEstateManagementSystem.service.serviceIMP;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.demo.RealEstateManagementSystem.pojo.Property;
import com.demo.RealEstateManagementSystem.pojo.User;
import com.demo.RealEstateManagementSystem.repository.PropertyRepository;
import com.demo.RealEstateManagementSystem.repository.UserRepository;
import com.demo.RealEstateManagementSystem.service.UserService;

@Service
public class UserServiceIMP implements UserService {
	
	@Autowired
	private UserRepository userrepo;
    
//	@Autowired
//    private UserRepository userRepository;
	
	@Autowired
	private PropertyRepository propertyrepo;
	
	public void addPropertyToAgent(Long agentId, Property property) {
        User agent = userrepo.findById(agentId)
                                   .orElseThrow(() -> new RuntimeException("Agent not found"));

        property.setAgent(agent);
        propertyrepo.save(property);
    }
	
	public List<Property> getPropertiesByAgent(Long agentId) {
        return propertyrepo.findByAgentId(agentId);
    }
	
	@Override
	public List<User> getAllUsers(User users) {
		return userrepo.findAll();
	}

	@Override
	public User createUser(User user) {
		return userrepo.save(user);
	}

	@Override
	public void deleteUser(Long id) {
		User existUser = userrepo.findById(id).orElseThrow(
				()-> new com.demo.RealEstateManagementSystem.exception.ResourceNotFoundException("User", "id", id));
		userrepo.delete(existUser);
	}

	@Override
	public User updateUser(User user,Long id) {
		User existUser= userrepo.findById(id).orElseThrow(
				()-> new com.demo.RealEstateManagementSystem.exception.ResourceNotFoundException("User","id", id));
		
		existUser.setEmail(user.getEmail());
		existUser.setName(user.getName());
		existUser.setPassword(user.getPassword());
		existUser.setPhoneNumber(user.getPhoneNumber());
		existUser.setType(user.getType());
		
		return userrepo.save(existUser);
	}
	public User authenticateUser(String email, String password,String type) {
        User user = userrepo.findByEmailAndPasswordAndType(email, password,type);
        return user;
    }

}
