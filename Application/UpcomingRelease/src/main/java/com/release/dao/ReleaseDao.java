package com.release.dao;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.release.configuration.FileProperties;
import com.release.dto.Release;
import com.release.util.JsonUtil;

@Repository
public class ReleaseDao {

	@Autowired
	FileProperties fileProperties;

	public List<Release> retrieveReleases(boolean isProd) {
		File file = null;
		InputStream stream = null;
		List<Release> releases = new ArrayList<Release>();
		String text = "[]";
		try {
			file = new File((isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal())
					+ fileProperties.getReleasesRms());
			stream = new FileInputStream(file);
			text = IOUtils.toString(stream, StandardCharsets.UTF_8.name());
			releases = JsonUtil.convertJsontoJava(text, new TypeReference<List<Release>>() {
			});
			releases.sort(Comparator.comparing(o -> o.getDate()));
		} catch (IOException e) {
			e.printStackTrace();
			return releases;
		} finally {
			if (stream != null) {
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		return releases;
	}

	public void updateReleases(List<Release> releases, boolean isProd) {
		File file = new File((isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal())
				+ fileProperties.getReleasesRms());

		if (file != null) {
			String data = JsonUtil.convertJavaToJson(releases);
			try (OutputStream out = new FileOutputStream(file, false);
					Writer writer = new OutputStreamWriter(out, StandardCharsets.UTF_8.name())) {
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
