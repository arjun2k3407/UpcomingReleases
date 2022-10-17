package com.release.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Data
@ConfigurationProperties(prefix = "hostname")
@Configuration
public class HostNameProperties {
	private String prod;
}
