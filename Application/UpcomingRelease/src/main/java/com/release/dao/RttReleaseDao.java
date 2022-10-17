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
import com.release.dto.Release;

@Repository
public class RttReleaseDao {

	@Autowired
	FileProperties fileProperties;

	public List<Release> retrieveReleases(boolean isProd) {
		File file = null;
		InputStream stream = null;
		List<Release> releases = new ArrayList<Release>();
		String text = "[]";
		try {
			file = new File((isProd ? fileProperties.getPathProd() : fileProperties.getPathLocal())
					+ fileProperties.getReleasesRtt());
			stream = new FileInputStream(file);
			text = IOUtils.toString(stream, UTF_8.name());
			releases = convertJsontoJava(text, new TypeReference<List<Release>>() {
			});
			releases.sort(comparing(o -> o.getDate()));
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
				+ fileProperties.getReleasesRtt());

		if (file != null) {
			String data = convertJavaToJson(releases);
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
