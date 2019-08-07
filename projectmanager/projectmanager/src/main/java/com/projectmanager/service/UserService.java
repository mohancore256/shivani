package com.projectmanager.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanager.model.User;
import com.projectmanager.repository.UserRepository;

@Service
public class UserService {
	
	Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;
	
	
	public User saveUser(User user) {
		logger.info("Inside of UserService.saveUser()");
		return userRepository.save(user);
	}
	
	public void  deleteUser(User user) {
		logger.info("Inside of UserService.deleteUser()");
		 userRepository.delete(user);
	}
	
	public List<User> getAll(){
		logger.info("Inside of UserService.findAll()");
		return userRepository.findAll();
	}
	
	public User getUserById(Long userId) {
		return userRepository.findById(userId).get();
	}
	
	

}
