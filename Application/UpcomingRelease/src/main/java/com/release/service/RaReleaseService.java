package com.release.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.release.dao.RaReleaseDao;
import com.release.dto.Release;

@Service
public class RaReleaseService {

	@Autowired
	RaReleaseDao dao;

	public List<Release> getReleases(boolean isProd) {
		return dao.retrieveReleases(isProd);
	}

	public Release getRelease(String id, boolean isProd) {
		Release release = null;
		List<Release> releases = dao.retrieveReleases(isProd);
		release = releases.stream().filter(r -> r.getId().equalsIgnoreCase(id)).findFirst().orElse(null);
		return release;
	}

	public boolean addRelease(Release release, boolean isProd) {
		List<Release> releases = dao.retrieveReleases(isProd);
		releases.add(release);
		dao.updateReleases(releases, isProd);
		return true;
	}

	public boolean removeRelease(String id, boolean isProd) {
		Release rel = null;
		List<Release> releases = dao.retrieveReleases(isProd);
		rel = releases.stream().filter(r -> id != null && r.getId().equalsIgnoreCase(id)).findFirst().orElse(null);
		if (rel != null) {
			releases.remove(rel);
		}
		dao.updateReleases(releases, isProd);
		return true;
	}

	public boolean updateRelease(Release release, boolean isProd) {
		Release rel = null;
		List<Release> releases = dao.retrieveReleases(isProd);
		rel = releases.stream().filter(r -> release.getId() != null && r.getId().equalsIgnoreCase(release.getId()))
				.findFirst().orElse(null);
		if (rel != null) {
			releases.remove(rel);
		}
		releases.add(release);
		dao.updateReleases(releases, isProd);
		return true;
	}
}
