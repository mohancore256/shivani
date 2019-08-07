package com.projectmanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectmanager.model.Task;
import com.projectmanager.repository.TaskRepository;

@Service
public class TaskService {

	@Autowired
	private TaskRepository taskRepository;
	
	public Task addTask(Task task) {
		return taskRepository.save(task);
	}
	
	public Task updateTask(Task task) {
		return taskRepository.save(task);
	}
	
	public void deleteTaskByTaskId(Long taskId) {
		 taskRepository.deleteById(taskId);
	}
	
	public Task getTask(Long taskId) {
		return taskRepository.findById(taskId).get();
	}
	
	public List<Task> getAllTask(){
		return taskRepository.findAll();
	}
}
