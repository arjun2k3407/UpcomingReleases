package com.release.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "file")
@Configuration
public class FileProperties {
	
	private String releasesRms;
	private String releasesRtt;
	private String releasesRa;
	private String menu;
	private String users;
	private String pathLocal;
	private String pathProd;
}
