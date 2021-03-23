import React from "react";
import { Mobile, PC } from "./Sections/MediaQuery";
import { Button, Typography } from "antd";
import axios from "axios";
import {
  SmileOutlined,
  HeartTwoTone,
  LoginOutlined,
  UserAddOutlined,
  LikeFilled,
  LogoutOutlined,
  OrderedListOutlined,
  UploadOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

function LandingPage(props) {
  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
  };

  return (
    <div
      style={{
        width: "85%",
        margin: "3rem auto",
      }}
    >
      <div style={{ textAlign: "center", paddingBottom: "3rem" }}>
        <Title level={1}>Life Scheduler</Title>
      </div>

      <div className="pc_container">
        <PC>
          <div style={{ display: "flex" }}>
            <img src={"/images/landing.jpg"} style={{ width: "400px" }} />
            <p style={{ fontSize: "20px", paddingLeft: "1rem" }}>
              .<br />
              Life Scheduler로 간단하고 편리하게 스케줄을 메모하고 관리하세요!
              <SmileOutlined />
              <br />꼭 일정이 아니여도 메모장처럼 기억해야할 것들을 적으셔도
              되고 플래너나 버킷리스트처럼도 사용 가능합니다!
              <br />
              .
              <br />
              Life Scheduler를 사용하셔서 여러분들의 Life를 더 편리하고 꼼꼼하게
              관리하세요!&nbsp;
              <HeartTwoTone twoToneColor="#eb2f96" />
              <br />
              .
              <br />
              {props.user.userData && props.user.userData.isAuth === false ? (
                <div>
                  <LoginOutlined />
                  &nbsp;
                  <a href={"/login"}>로그인 하러가기</a>
                  <br />
                  <UserAddOutlined />
                  &nbsp;
                  <a href={"/register"}>회원가입 하러가기</a>
                  <br />.
                  <br />.
                </div>
              ) : (
                <div>
                  <OrderedListOutlined />
                  &nbsp;
                  <a href={"/main"}>내 스케줄 보기</a>
                  <br />
                  <UploadOutlined />
                  &nbsp;
                  <a href={"/upload/schedule"}>스케줄 업로드 하기</a>
                  <br />
                  <LogoutOutlined />
                  &nbsp;
                  <Button onClick={onClickHandler}>로그아웃</Button>
                  <br />.
                </div>
              )}
            </p>
          </div>
          <br />
          <p style={{ fontSize: "1rem" }}>
            이런 것도 활용 할 수 있어요! &nbsp;
            <LikeFilled />
          </p>
          <h2>
            <HeartTwoTone twoToneColor="#eb2f96" />
            D-day 기능
            <HeartTwoTone twoToneColor="#eb2f96" />
          </h2>
          <h2>
            <HeartTwoTone twoToneColor="#eb2f96" />
            우선순위 별 필터링
            <HeartTwoTone twoToneColor="#eb2f96" />
          </h2>
          <h2>
            <HeartTwoTone twoToneColor="#eb2f96" />
            종류별 분류 기능
            <HeartTwoTone twoToneColor="#eb2f96" />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <img
                src={`/images/landing2.jpg`}
                style={{
                  width: "350px",
                }}
              />
            </div>
          </h2>
        </PC>
      </div>

      <div className="mobile_container">
        <Mobile>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={"/images/landing.jpg"} style={{ width: "400px" }} />
          </div>
          <p style={{ fontSize: "20px", textAlign: "center" }}>
            .<br />
            Life Scheduler로 간단하고 편리하게 스케줄을 메모하고 관리하세요!
            <SmileOutlined />
            <br />꼭 일정이 아니여도 메모장처럼 기억해야할 것들을 적으셔도 되고
            플래너나 버킷리스트처럼도 사용 가능합니다!
            <br />
            .
            <br />
            Life Scheduler를 사용하셔서 여러분들의 Life를 더 편리하고 꼼꼼하게
            관리하세요!&nbsp;
            <HeartTwoTone twoToneColor="#eb2f96" />
            <br />
            .
            <br />
          </p>

          {props.user.userData && props.user.userData.isAuth === false ? (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={"/login"} style={{ fontSize: "1rem" }}>
                  <LoginOutlined />
                  로그인 하러가기
                </a>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={"/register"} style={{ fontSize: "1rem" }}>
                  <UserAddOutlined />
                  회원가입 하러가기
                </a>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={"/main"} style={{ fontSize: "1rem" }}>
                  <OrderedListOutlined />
                  &nbsp;내 스케줄 보기
                </a>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <a href={"/upload/schedule"} style={{ fontSize: "1rem" }}>
                  <UploadOutlined />
                  &nbsp; 스케줄 업로드 하기
                </a>
              </div>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <LogoutOutlined />
                &nbsp;
                <Button onClick={onClickHandler} size="large">
                  로그아웃
                </Button>
              </div>
            </div>
          )}
        </Mobile>
      </div>
    </div>
  );
}

export default LandingPage;
