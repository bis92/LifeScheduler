import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import axios from "axios";

const { TextArea } = Input;

const CategoryOptions = [
  { value: 0, label: "일정" },
  { value: 1, label: "기념일" },
  { value: 2, label: "기타" },
  { value: 3, label: "살것" },
  { value: 4, label: "계획" },
];

const ImportanceOptions = [
  { value: 1, label: "★☆☆☆☆" },
  { value: 2, label: "★★☆☆☆" },
  { value: 3, label: "★★★☆☆" },
  { value: 4, label: "★★★★☆" },
  { value: 5, label: "★★★★★" },
];

function UpdateSchedulePage(props) {
  const [Schedule, setSchedule] = useState(
    props.user.getDetailSchedule.schedule
  );
  const [Title, setTitle] = useState(Schedule.title);
  const [Description, setDescription] = useState(Schedule.description);
  const [Category, setCategory] = useState(Schedule.category);
  const [SpecifiedDate, setSpecifiedDate] = useState(Schedule.specifiedDate);
  const [Importance, setImportance] = useState(Schedule.importance);

  useEffect(() => {}, []);

  const onChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onChangeDescription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const onChangeCategory = (event) => {
    setCategory(event.currentTarget.value);
  };

  const onChangeSpecifiedDate = (event) => {
    setSpecifiedDate(event.currentTarget.value);
  };

  const onChangeImportance = (event) => {
    setImportance(event.currentTarget.value);
  };

  const updateSchedule = (e) => {
    e.preventDefault();

    let body = {
      writer: props.user.userData._id,
      _id: Schedule._id,
      title: Title,
      description: Description,
      category: Category,
      specifiedDate: SpecifiedDate,
      importance: Importance,
    };

    axios.post("/api/schedules/updateSchedule", body).then((response) => {
      if (response.data.success) {
        message.success("스케쥴을 성공적으로 수정했습니다.");
        setTimeout(() => {
          props.history.push("/main");
        }, 3000);
      } else {
        alert("스케쥴을 수정하는데 실패했습니다.");
      }
    });
  };

  const cancelHandler = () => {
    props.history.push("/main");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>
          여러분의 스케줄을 등록하세요! <SmileOutlined />
        </h2>
      </div>

      <Form onSubmit={updateSchedule}>
        <label>이름</label>
        <Input value={Title} onChange={onChangeTitle} />
        <br />
        <br />
        <label>설명</label>
        <TextArea value={Description} onChange={onChangeDescription} />
        <br />
        <br />
        <label>지정일</label>
        <Input
          value={SpecifiedDate}
          onChange={onChangeSpecifiedDate}
          placeholder="YYYY-MM-DD"
        />
        <br />
        <br />
        <label>종류 : </label>
        <select onChange={onChangeCategory} value={Category}>
          {CategoryOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <label>중요도 : </label>
        <select onChange={onChangeImportance} value={Importance}>
          {ImportanceOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit" onClick={updateSchedule}>
          수정
        </Button>
        &nbsp;
        <Button type="submit" onClick={cancelHandler}>
          취소
        </Button>
      </Form>
    </div>
  );
}

export default UpdateSchedulePage;
