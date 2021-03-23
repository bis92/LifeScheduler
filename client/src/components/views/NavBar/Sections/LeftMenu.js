import React from "react";
import { Menu } from "antd";
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key="mail" style={{ paddingTop: "10px" }}>
        <a href="/">Home</a>
      </Menu.Item>
      <Menu.Item key="main" style={{ paddingTop: "10px" }}>
        <a href="/main">Main</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
