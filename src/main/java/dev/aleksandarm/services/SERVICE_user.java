package dev.aleksandarm.services;

import dev.aleksandarm.data.DATA_user;

public interface SERVICE_user {
	public abstract String register(DATA_user user);
	public abstract Long registeredUsers();
	public abstract Long track();
}
