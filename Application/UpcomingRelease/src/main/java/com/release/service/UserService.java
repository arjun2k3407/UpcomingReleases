package com.release.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.release.dao.UserDao;
import com.release.dto.User;

@Service
public class UserService {

	@Autowired
	private UserDao dao;

	public List<User> getUsers(boolean isProd) {
		return dao.retrieveUsers(isProd);
	}

	public User getUser(String ntid, boolean isProd) {
		User user = null;
		List<User> users = dao.retrieveUsers(isProd);
		user = users.stream().filter(r -> r.getNtid().equalsIgnoreCase(ntid)).findFirst().orElse(null);
		return user;
	}

	public List<User> addUser(User user, boolean isProd) {
		List<User> users = dao.retrieveUsers(isProd);
		users.add(user);
		dao.updateUsers(users, isProd);
		return users;
	}

	public List<User> updateUser(User user, boolean isProd) {
		List<User> users = dao.retrieveUsers(isProd);
		users.removeIf(uu -> uu.getId().equalsIgnoreCase(user.getId()));
		users.add(user);
		dao.updateUsers(users, isProd);
		return users;
	}

	public List<User> deleteUser(String id, boolean isProd) {
		List<User> users = dao.retrieveUsers(isProd);
		users.removeIf(uu -> uu.getId().equalsIgnoreCase(id));
		dao.updateUsers(users, isProd);
		return users;
	}
}
