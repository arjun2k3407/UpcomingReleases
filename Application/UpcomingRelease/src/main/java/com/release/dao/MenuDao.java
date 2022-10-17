package com.release.dao;

import static com.release.util.JsonUtil.convertJavaToJson;
import static com.release.util.JsonUtil.convertJsontoJava;
import static java.nio.charset.StandardCharsets.UTF_8;
import static java.util.Comparator.comparing;

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
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.release.configuration.FileProperties;
import com.release.dto.Menu;

@Repository
public class MenuDao {

	@Autowired
	private FileProperties fileProperties;

	public List<Menu> retrieveMenu(boolean isProd) {

		File file = null;
		InputStream stream = null;
		List<Menu> menu = new ArrayList<Menu>();
		String text = "[]";
		try {
			file = new File(
					(isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal()) + fileProperties.getMenu());
			stream = new FileInputStream(file);
			text = IOUtils.toString(stream, UTF_8.name());
			menu = convertJsontoJava(text, new TypeReference<List<Menu>>() {
			});
			sortMenu(menu);
		} catch (IOException e) {
			e.printStackTrace();
			return menu;
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return menu;
	}

	public void sortMenu(List<Menu> menu) {
		menu.sort(comparing(o -> o.getId()));
		menu.stream().forEach(m -> m.getItems().sort(comparing(o -> o.getId())));
	}

	public void updateMenu(List<Menu> menu, boolean isProd) {
		File file = new File(
				(isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal()) + fileProperties.getMenu());

		if (file != null) {
			String data = convertJavaToJson(menu);
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
