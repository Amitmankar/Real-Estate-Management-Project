package com.demo.RealEstateManagementSystem.controller;


import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.springframework.web.multipart.MultipartFile;

import com.demo.RealEstateManagementSystem.pojo.Property;
import com.demo.RealEstateManagementSystem.pojo.User;
import com.demo.RealEstateManagementSystem.service.UserService;



@RestController
@RequestMapping("/api/users")

public class UserController {
    @Autowired
    private UserService userService;
    @RestController
    @RequestMapping("/api/users")
    public class PropertyController {

        @Autowired
        private UserService userService;

        @PostMapping("/{agentId}/properties")
        public ResponseEntity<?> addPropertyToAgent(@PathVariable Long agentId,  @RequestParam("location") String location,
                @RequestParam("proptype") String proptype,
                @RequestParam("bedrooms") int bedrooms,
                @RequestParam("bathrooms") int bathrooms,
                @RequestParam("squareFeet") double squareFeet,
                @RequestParam("lotSize") double lotSize,
                @RequestParam("price") float price,
                @RequestParam("description") String description,
                @RequestParam("image") MultipartFile image){
            try {
                Property property = new Property();
                property.setLocation(location);
                property.setProptype(proptype);
                property.setBedrooms(bedrooms);
                property.setBathrooms(bathrooms);
                property.setSquareFeet(squareFeet);
                property.setLotSize(lotSize);
                property.setAvail("available");
                property.setPrice(price);
                property.setDescription(description);
                
                if (image != null && !image.isEmpty()) {
                    property.setImage(image.getBytes());
                }
                userService.addPropertyToAgent(agentId, property);
                
                return ResponseEntity.ok().body("{\"message\":\"Property added successfully\"}");
            } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{\"message\":\"Error adding property\"}");
            }
        }
    }


    @GetMapping("/{agentId}/properties")
    public ResponseEntity<List<Property>> getPropertiesByAgent(@PathVariable Long agentId) {
        List<Property> properties = userService.getPropertiesByAgent(agentId);
        return ResponseEntity.ok(properties);
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User authenticatedUser = userService.authenticateUser(user.getEmail(), user.getPassword(),user.getType());
        
        if (authenticatedUser != null) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("type", authenticatedUser.getType());
            response.put("id", authenticatedUser.getId());
            response.put("name", authenticatedUser.getName());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(401).body("{\"message\": \"Invalid credentials\"}");
        }
    }
    @PostMapping("/register")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(user, id);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @GetMapping
    public List<User> getAllUsers(User user) {
        return userService.getAllUsers(user);
    }
}
