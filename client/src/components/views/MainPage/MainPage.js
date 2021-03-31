import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Row, Col, Card, Typography, Button } from "antd";
import moment from "moment";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { category, importance } from "./Sections/Datas";
import { getDetailSchedule } from "../../../_actions/user_actions";
import { UploadOutlined } from "@ant-design/icons";
import { Empty } from "antd";
const { Title } = Typography;
const ImportanceOptions = ["none", "★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"];

function MainPage(props) {
  const user = props.user;
  const dispatch = useDispatch();
  const [Schedules, setSchedules] = useState([]);
  const [Filters, setFilters] = useState({
    category: [],
    importance: [],
  });
  const today = moment();
  let count = 0;

  useEffect(() => {
    let body = {};
    getSchedules(body);
  }, []);

  const getSchedules = (body) => {
    axios.post("/api/schedules/getSchedules", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setSchedules([...Schedules, ...response.data.schedules]);
        } else {
          setSchedules(response.data.schedules);
        }
      } else {
        alert("스케쥴을 가져오는데 실패했습니다.");
      }
    });
  };

  const deleteHandler = (scheduleId) => {
    axios.delete(`/api/schedules/delete?id=${scheduleId}`).then((response) => {
      if (response.data.success) {
        let body = {
          filters: Filters,
        };
        getSchedules(body);
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

  const showFilteredResult = (filters) => {
    let body = {
      filters: filters,
    };

    getSchedules(body);
  };

  const handleFilters = (filters, options) => {
    const newFilters = { ...Filters };

    newFilters[options] = filters;

    if (options === "importance") {
      let array = [];
      array.push(filters);
      newFilters[options] = array;
    }

    showFilteredResult(newFilters);
    setFilters(newFilters);
  };

  const renderCards = Schedules.map((schedule, index) => {
    const dday = Math.round(
      moment.duration(today.diff(schedule.specifiedDate)).asDays() - 1
    );
    if (
      (schedule.writer && schedule.writer._id) ===
      (user.userData && user.userData._id)
    ) {
      count += 1;

      return (
        <Col key={index}>
          <Card
            extra={
              <a
                href={`/schedule/${schedule._id}`}
                style={{ fontSize: "20px" }}
              >
                More
              </a>
            }
            style={{ width: 400, height: "220px" }}
            cover={
              <a href={`/schedule/${schedule._id}`}>
                <span style={{ margin: "1rem", fontSize: "1rem" }}>
                  {schedule.description}
                </span>
              </a>
            }
            title={schedule.title}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "1rem" }}>
                {schedule.specifiedDate}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <label>중요도 : </label>
                {ImportanceOptions[`${schedule.importance}`]}
              </p>
              <span style={{ paddingRight: "3rem", fontSize: "1rem" }}>
                {dday < 0 ? "D" + dday : dday === 0 ? "D-Day" : "기간만료"}
              </span>
              <Button
                onClick={() => updateHandler(schedule._id)}
                style={{ fontSize: "1rem" }}
              >
                수정
              </Button>
              &nbsp;
              <Button
                style={{ fontSize: "1rem" }}
                onClick={() => deleteHandler(schedule._id)}
              >
                삭제
              </Button>
            </div>
          </Card>
        </Col>
      );
    }
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center", paddingBottom: "2rem" }}>
        <Title level={2}>Registered Schedules</Title>
      </div>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ paddingBottom: "1rem" }}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={category}
            handleFilters={(filters) => handleFilters(filters, "category")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={importance}
            handleFilters={(filters) => handleFilters(filters, "importance")}
          />
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row gutter={[16, 16]}>{renderCards}</Row>
      </div>

      {count <= 0 && (
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Empty description={false} />
          <br />
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            스케쥴을 업로드 하세요.
            <br />
          </h2>
          <a
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "15px",
            }}
            href={`/upload/schedule`}
          >
            <UploadOutlined />
            &nbsp; 스케쥴 업로드 하기
          </a>
        </div>
      )}
    </div>
  );
}

export default MainPage;
