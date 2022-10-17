package com.release.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.release.dao.MenuDao;
import com.release.dto.Menu;
import com.release.dto.MenuItem;

@Service
public class MenuService {

	@Autowired
	MenuDao dao;

	public List<Menu> getMenu(boolean isProd) {
		return dao.retrieveMenu(isProd);
	}

	public List<Menu> addMenu(Menu menu, boolean isProd) {
		List<Menu> menus = dao.retrieveMenu(isProd);
		if ("m".equalsIgnoreCase(menu.getPosition())) {
			menus.forEach(m -> {
				if (menu.getPrevId() < m.getId()) {
					m.setId(m.getId() + 1);
				}
			});
			menu.setId(menu.getPrevId() + 1);
		} else if ("f".equalsIgnoreCase(menu.getPosition())) {
			menus.forEach(m -> m.setId(m.getId() + 1));
			menu.setId(1);
		} else {
			menu.setId(menus.size() + 1);
		}
		menus.add(menu);
		dao.sortMenu(menus);
		dao.updateMenu(menus, isProd);
		return menus;
	}

	public List<Menu> updateMenu(Menu menu, boolean isProd) {
		Menu m = null;
		List<Menu> menus = dao.retrieveMenu(isProd);
		m = menus.stream().filter(mm -> mm.getId() == menu.getId()).findFirst().orElse(null);
		if (m != null) {
			menus.remove(m);
			String parentName = menu.getHeader();
			menu.getItems().forEach(i -> i.setParentMenu(parentName));
			if ("m".equalsIgnoreCase(menu.getPosition())) {
				if (menu.getPrevId() != 0 && menu.getId() - menu.getPrevId() > 1) {
					menus.forEach(men -> {
						if (men.getId() > menu.getPrevId() && men.getId() < menu.getId()) {
							men.setId(men.getId() + 1);
						}
					});
					menu.setId(menu.getPrevId() + 1);
				} else if (menu.getPrevId() != 0 && menu.getId() - menu.getPrevId() < 0) {
					menus.forEach(men -> {
						if (men.getId() <= menu.getPrevId() && men.getId() > menu.getId()) {
							men.setId(men.getId() - 1);
						}
					});
					menu.setId(menu.getPrevId());
				}
			} else if ("f".equalsIgnoreCase(menu.getPosition())) {
				menus.forEach(me -> {
					if (me.getId() < menu.getId()) {
						me.setId(me.getId() + 1);
					}
				});
				menu.setId(1);
			}
			menus.add(menu);
			dao.sortMenu(menus);
			dao.updateMenu(menus, isProd);
		}
		return menus;
	}

	public List<Menu> addMenuItem(MenuItem item, boolean isProd) {
		List<Menu> menus = dao.retrieveMenu(isProd);
		menus.stream().filter(m -> item.getParentMenu() != null && item.getParentMenu().equalsIgnoreCase(m.getHeader()))
				.forEach(mm -> {
					List<MenuItem> itemlist = mm.getItems();
					if ("m".equalsIgnoreCase(item.getPosition())) {
						itemlist.forEach(i -> {
							if (item.getPrevId() < i.getId()) {
								i.setId(i.getId() + 1);
							}
						});
						item.setId(item.getPrevId() + 1);
					} else if ("f".equalsIgnoreCase(item.getPosition())) {
						itemlist.forEach(i -> i.setId(i.getId() + 1));
						item.setId(1);
					} else {
						item.setId(itemlist.size() + 1);
					}
					itemlist.add(item);
				});
		dao.sortMenu(menus);
		dao.updateMenu(menus, isProd);
		return menus;
	}

	public List<Menu> updateMenuItem(MenuItem item, boolean isProd) {
		List<Menu> menus = dao.retrieveMenu(isProd);
		menus.stream().filter(m -> item.getParentMenu() != null && item.getParentMenu().equalsIgnoreCase(m.getHeader()))
				.forEach(mm -> {
					List<MenuItem> itemlist = mm.getItems();
					MenuItem i = itemlist.stream().filter(it -> it.getId() == item.getId()).findFirst().orElse(null);
					if (i != null) {
						itemlist.remove(i);
						if ("m".equalsIgnoreCase(item.getPosition())) {
							if (item.getPrevId() != 0 && item.getId() - item.getPrevId() > 1) {
								itemlist.forEach(it -> {
									if (it.getId() > item.getPrevId() && it.getId() < item.getId()) {
										it.setId(it.getId() + 1);
									}
								});
								item.setId(item.getPrevId() + 1);
							} else if (item.getPrevId() != 0 && item.getId() - item.getPrevId() < 0) {
								itemlist.forEach(it -> {
									if (it.getId() <= item.getPrevId() && it.getId() > item.getId()) {
										it.setId(it.getId() - 1);
									}
								});
								item.setId(item.getPrevId());
							}
						} else if ("f".equalsIgnoreCase(item.getPosition())) {
							itemlist.forEach(it -> {
								if (it.getId() < item.getId()) {
									it.setId(it.getId() + 1);
								}
							});
							item.setId(1);
						}
						itemlist.add(item);
					}
				});
		dao.sortMenu(menus);
		dao.updateMenu(menus, isProd);
		return menus;
	}

	public List<Menu> deleteMenu(int id, boolean isProd) {
		List<Menu> menus = dao.retrieveMenu(isProd);
		Menu menu = menus.stream().filter(m -> id == m.getId()).findFirst().orElse(null);
		if (menu != null) {
			menus.remove(menu);
			menus.forEach(m -> {
				if (id < m.getId())
					m.setId(m.getId() - 1);
			});
			dao.sortMenu(menus);
			dao.updateMenu(menus, isProd);
		}
		return menus;
	}

	public List<Menu> deleteMenuItem(String parentMenu, int id, boolean isProd) {
		List<Menu> menus = dao.retrieveMenu(isProd);
		menus.stream().filter(m -> parentMenu.equalsIgnoreCase(m.getHeader())).forEach(mm -> {
			List<MenuItem> itemlist = mm.getItems();
			MenuItem it = itemlist.stream().filter(ii -> ii.getId() == id).findFirst().orElse(null);
			if (it != null) {
				itemlist.remove(it);
				itemlist.forEach(i -> {
					if (id < i.getId())
						i.setId(i.getId() - 1);
				});
			}
		});
		dao.sortMenu(menus);
		dao.updateMenu(menus, isProd);
		return menus;
	}
}
