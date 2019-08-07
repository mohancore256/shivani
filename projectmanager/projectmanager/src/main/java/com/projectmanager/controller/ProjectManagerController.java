package com.projectmanager.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.websocket.server.PathParam;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.projectmanager.model.Project;
import com.projectmanager.model.Task;
import com.projectmanager.model.User;
import com.projectmanager.service.ProjectService;
import com.projectmanager.service.TaskService;
import com.projectmanager.service.UserService;

@RestController
@CrossOrigin
public class ProjectManagerController {

	Logger logger = LoggerFactory.getLogger(ProjectManagerController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private TaskService taskService;

	@RequestMapping(path = "projectManager/user/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveUser(@RequestBody User user) {
		logger.info("Adding New User ");

		User userResponse = userService.saveUser(user);
		if (null != userResponse) {
			return ResponseEntity.ok(userResponse);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(user);
		}
	}

	@RequestMapping(path = "projectManager/user/update", method = RequestMethod.POST)
	public ResponseEntity<?> updateUser(@RequestBody User user) {
		logger.info("updating user");

		User userResponse = userService.saveUser(user);
		if (null != userResponse) {
			return ResponseEntity.ok(userResponse);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(user);
		}
	}

	@RequestMapping(path = "projectManager/user/delete", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathParam("userId") long userId) {
		logger.info("deleteing user");
		User user = userService.getUserById(userId);
		if (null != user) {
			userService.deleteUser(user);
			return ResponseEntity.ok(HttpStatus.OK);
		} else {
			return ResponseEntity.ok(HttpStatus.NOT_FOUND);
		}

	}

	@RequestMapping(path = "projectManager/user/getAll", method = RequestMethod.GET)
	public ResponseEntity<?> getAllUser() {
		logger.info("Get All User ");
		List<User> allUserList = userService.getAll();
		return ResponseEntity.ok(allUserList);

	}

	@RequestMapping(value = "projectManager/project/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveProject(@RequestBody Project project) {
		logger.info("Adding new project");
		Set<User> tempUsers = project.getUsers();
		project.setUsers(null);
		Project projectRespponse = projectService.saveProject(project);
		if (null != projectRespponse) {
			if (tempUsers != null) {
				for (User user : tempUsers) {
					User userObj = userService.getUserById(user.getUserId());
					userObj.setProject(projectRespponse);
					userService.saveUser(userObj);
				}
			}
			project.setProjectId(projectRespponse.getProjectId());
			return ResponseEntity.ok(project);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(projectRespponse);
		}

	}

	@RequestMapping(value = "projectManager/project/delete", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteProject(@PathParam("projectId") Long projectId) {
		logger.info("deleting a project");
		Project projectResponse = projectService.getProjectById(projectId);
		if (null != projectResponse) {
			projectService.deleteProjectById(projectId);
			return ResponseEntity.ok(projectResponse);
		} else {
			return ResponseEntity.ok(HttpStatus.NOT_FOUND);
		}
	}

	@RequestMapping(value = "/projectManager/project/getAll", method = RequestMethod.GET)
	public ResponseEntity<?> getAllProject() {
		logger.info("Getting All project");
		List<Project> projectList = projectService.getAll();
		if (null != projectList) {
			return ResponseEntity.ok(projectList);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(projectList);
		}
	}

	@RequestMapping(value = "/projectManager/project/update", method = RequestMethod.POST)
	public ResponseEntity<?> updateProject(@RequestBody Project project) {
		logger.info("updating a project");
		Project projectResponse = projectService.saveProject(project);
		if (null != projectResponse) {
			return ResponseEntity.ok(projectResponse);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(projectResponse);
		}
	}

	@RequestMapping(value = "/projectManager/task/save", method = RequestMethod.POST)
	public ResponseEntity<?> saveTask(@RequestBody Task task) {
		logger.info("Adding new Task");
		
		if (null != task.getProject()) {
			Project projectObj = projectService.getProjectById(task.getProject().getProjectId());
			task.setProject(projectObj);
		}
		Set<User> users = task.getUsers();
		task.setUsers(null);
		Task taskResponse = taskService.addTask(task);
		if (users != null) {
			for (User user : users) {
				User userObj = userService.getUserById(user.getUserId());
				userObj.setTask(taskResponse);
				userService.saveUser(userObj);
			}
		}
		if (null != taskResponse) {
			return ResponseEntity.ok(taskResponse);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(taskResponse);
		}
	}

	@RequestMapping(value = "/projectManager/task/delete", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteTask(@PathParam("taskId") Long taskId) {
		logger.info("Deleteing a Task");
		Task taskResponse = taskService.getTask(taskId);
		if (null != taskResponse) {
			taskService.deleteTaskByTaskId(taskId);
			return ResponseEntity.ok(taskResponse);
		} else {
			return ResponseEntity.ok(HttpStatus.NOT_ACCEPTABLE);
		}
	}

	@RequestMapping(value = "/projectManager/task/getAll", method = RequestMethod.GET)
	public ResponseEntity<?> getAllTask() {
		logger.info("getting all task");
		List<Project> projectList = projectService.getAll();
		if (null != projectList) {
			return ResponseEntity.ok(projectList);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(projectList);
		}
	}

	@RequestMapping(value = "projectManager/task/update", method = RequestMethod.POST)
	public ResponseEntity<?> updateTask(@RequestBody Task task) {
		logger.info("updating a project");
		Task taskResponse = taskService.addTask(task);
		if (null != taskResponse) {
			return ResponseEntity.ok(taskResponse);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(taskResponse);
		}
	}

}
