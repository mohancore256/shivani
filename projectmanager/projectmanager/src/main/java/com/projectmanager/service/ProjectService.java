package com.projectmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanager.model.Project;
import com.projectmanager.repository.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	//check this
	public Project saveProject(Project project) {
		if(null != project) {
			return projectRepository.save(project);	
		}else {
			return null;
		}
		
	}
	
	public List<Project> getAll(){
		return projectRepository.findAll();	
	}
	
	public Project getProjectById(Long projectId) {
		return projectRepository.findById(projectId).get();
	}
	
	public void deleteProjectById(Long projectId) {
		projectRepository.deleteById(projectId);
	}
	
	public Project updateProject(Project project) {
		//need code here
		return projectRepository.save(project);
	}
}
