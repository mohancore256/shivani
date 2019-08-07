package com.projectmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projectmanager.model.Project;

@Repository
public interface ProjectRepository  extends JpaRepository<Project, Long>{

}
