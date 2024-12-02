package com.AIMLproject.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.AIMLproject.backend.domain.Project;
import com.AIMLproject.backend.domain.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	List<Project> findByUser(User user);
}
