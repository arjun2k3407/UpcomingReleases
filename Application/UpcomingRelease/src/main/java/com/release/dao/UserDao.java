package com.release.dao;

import static com.release.util.JsonUtil.convertJavaToJson;
import static com.release.util.JsonUtil.convertJsontoJava;
import static java.nio.charset.StandardCharsets.UTF_8;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.release.configuration.FileProperties;
import com.release.dto.User;

@Repository
public class UserDao {

	@Autowired
	private FileProperties fileProperties;

	public List<User> retrieveUsers(boolean isProd) {

		File file = null;
		InputStream stream = null;
		List<User> users = new ArrayList<>();
		String text = "[]";
		try {
			file = new File((isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal())
					+ fileProperties.getUsers());
			stream = new FileInputStream(file);
			text = IOUtils.toString(stream, UTF_8.name());
			users = convertJsontoJava(text, new TypeReference<List<User>>() {
			});
			Collections.sort(users, Comparator
					.comparing(User::getFname)
					.thenComparing(User::getLname)
					.thenComparing(User::getNtid));
		} catch (IOException e) {
			e.printStackTrace();
			return users;
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return users;
	}

	public void updateUsers(List<User> users, boolean isProd) {
		File file = new File(
				(isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal()) + fileProperties.getUsers());

		if (file != null) {
			String data = convertJavaToJson(users);
			try (OutputStream out = new FileOutputStream(file, false);
					Writer writer = new OutputStreamWriter(out, UTF_8.name())) {
				writer.write(data);
				writer.flush();
				writer.close();
				out.close();
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
