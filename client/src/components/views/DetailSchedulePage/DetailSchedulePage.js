import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Descriptions, Button } from "antd";
import { HeartTwoTone } from "@ant-design/icons";
import { getDetailSchedule } from "../../../_actions/user_actions";
import moment from "moment";
import { PC, Tablet, Tablet2, Mobile } from "./Sections/MediaQuery";

const ImportanceOptions = ["none", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];

function DetailSchedulePage(props) {
  const scheduleId = props.match.params.scheduleId;
  const today = moment();
  const dispatch = useDispatch();
  const [Schedule, setSchedule] = useState({});

  useEffect(() => {
    let body = {
      scheduleId: scheduleId,
    };

    axios.post("/api/schedules/getDetailSchedule", body).then((response) => {
      if (response.data.success) {
        setSchedule(response.data.schedule);
      } else {
        alert("스케줄을 가져오는데 실패했습니다.");
      }
    });
  }, []);

  const clickHandler = () => {
    axios.delete(`/api/schedules/delete?id=${scheduleId}`).then((response) => {
      if (response.data.success) {
        props.history.push("/main");
      } else {
        alert("스케쥴을 삭제하는데 실패했습니다.");
      }
    });
  };

  const updateHandler = (scheduleId) => {
    dispatch(getDetailSchedule(scheduleId)).then((response) => {
      if (response.payload.success) {
        props.history.push("/update");
      }
    });
  };

  const dday = Math.round(
    moment.duration(today.diff(Schedule.specifiedDate)).asDays() - 1
  );

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: "90%",
        marginTop: "3rem",
        paddingLeft: "5rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <PC>
          <h1>
            <HeartTwoTone />
            {Schedule.title}
            <HeartTwoTone />
          </h1>
        </PC>
        <Tablet2>
          <h1>
            <HeartTwoTone />
            {Schedule.title}
            <HeartTwoTone />
          </h1>
        </Tablet2>
        <Tablet>
          <h2>
            <HeartTwoTone />
            {Schedule.title}
            <HeartTwoTone />
          </h2>
        </Tablet>
        <Mobile>
          <h2>
            <HeartTwoTone />
            {Schedule.title}
            <HeartTwoTone />
          </h2>
        </Mobile>
      </div>
      <br />

      <Descriptions title="스케줄 정보" bordered style={{ fontSize: "1rem" }}>
        <Descriptions.Item label="이름" style={{ fontSize: "1rem" }}>
          {Schedule.title}
        </Descriptions.Item>
        <Descriptions.Item label="설명" style={{ fontSize: "1rem" }}>
          {Schedule.description}
        </Descriptions.Item>
        <Descriptions.Item label="종류" style={{ fontSize: "1rem" }}>
          {Schedule.category === 0
            ? "일정"
            : Schedule.category === 1
            ? "기념일"
            : Schedule.category === 2
            ? "기타"
            : Schedule.category === 3
            ? "살것"
            : "계획"}
        </Descriptions.Item>
        <Descriptions.Item label="지정일" style={{ fontSize: "1rem" }}>
          {Schedule.specifiedDate}
        </Descriptions.Item>
        <Descriptions.Item label="디데이" style={{ fontSize: "1rem" }}>
          <span style={{ paddingRight: "3rem" }}>
            {dday < 0 ? "D" + dday : dday === 0 ? "D-Day" : "기간만료"}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="중요도" style={{ fontSize: "1rem" }}>
          {ImportanceOptions[`${Schedule.importance}`]}
        </Descriptions.Item>
      </Descriptions>

      <br />
      <br />
      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "2rem",
        }}
      >
        <Button size="large" onClick={() => updateHandler(Schedule._id)}>
          수정
        </Button>
        &nbsp;&nbsp;
        <Button size="large" type="danger" onClick={clickHandler}>
          삭제
        </Button>
      </div>

      <div className="pc_container">
        <PC>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={"/images/schedule.jpg"}
              style={{
                width: "400px",
              }}
            />
            <img src={"/images/postit.jpg"} style={{ width: "400px" }} />
            <img src={"/images/schedule1.jpg"} style={{ width: "400px" }} />
            <img src={"/images/graph.jpg"} style={{ width: "400px" }} />
          </div>
        </PC>
      </div>
      <div className="tablet_container">
        <Tablet>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={"/images/schedule.jpg"}
              style={{
                width: "300px",
              }}
            />
            <img
              src={"/images/postit.jpg"}
              style={{
                width: "300px",
              }}
            />
          </div>
        </Tablet>
      </div>
      <div className="tablet_container2">
        <Tablet2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <img
              src={"/images/schedule.jpg"}
              style={{
                width: "300px",
              }}
            />
            <img
              src={"/images/postit.jpg"}
              style={{
                width: "300px",
              }}
            />
            <img src={"/images/schedule1.jpg"} style={{ width: "300px" }} />
          </div>
        </Tablet2>
      </div>
    </div>
  );
}

export default DetailSchedulePage;
