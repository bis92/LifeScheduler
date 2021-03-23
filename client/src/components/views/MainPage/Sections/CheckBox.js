import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const toggleHandler = (value) => {
    const currentIndex = Checked.indexOf(value);

    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBoxList =
    props.list &&
    props.list.map((item, index) => (
      <React.Fragment key={index}>
        <span style={{ paddingLeft: "1rem" }}>{item.name}</span>
        <Checkbox
          checked={Checked.indexOf(item._id) === -1 ? false : true}
          onChange={() => toggleHandler(item._id)}
        />
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="종류" key="0">
          {renderCheckBoxList}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
