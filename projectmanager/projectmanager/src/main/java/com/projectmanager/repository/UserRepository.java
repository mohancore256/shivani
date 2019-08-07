package com.projectmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectmanager.model.User;

@Repository
public interface UserRepository extends  JpaRepository<User, Long>{
	
	

}
