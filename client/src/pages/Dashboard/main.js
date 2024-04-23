import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card } from "antd";

const { Title, Text } = Typography;

function Dashboard() {
  const { user } = useSelector((state) => state.users);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "1000px" }}>
        <Card
          className="card"
          title="Account Details"
          style={{ width: "calc(50% - 8px)", marginRight: "50px" }} // Set width to half minus margin
        >
          <div className="card-content"> 
              <Title level={2} style={{ fontWeight: "bold" }}>Balance</Title> 
              <Text style={{ fontSize: "20px", fontWeight: "bold", marginLeft: "auto" }} > &nbsp; PHP {user.balance || 0}</Text>
          </div>
          <div className="card-content"> 
            <Title level={5} className="title" style={{ fontWeight: "bold" }}>Student ID no.</Title> 
            <Text style={{ marginLeft: "auto" }} > &nbsp; {user.idNumber || 0}</Text>
          </div>
          <div className="card-content"> 
            <Title level={5} className="title" style={{ fontWeight: "bold" }}>Account Number</Title> 
            <Text style={{ marginLeft: "auto" }} > &nbsp; {user._id} </Text>
          </div>
        </Card>

        <Card

          className="card"
          title="User Information"
          style={{ width: "calc(50% - 8px)" }} // Set width to half minus margin
        >
          <div className="card-content"> 
            <Title level={5} className="title">Name</Title> 
            <Text style={{ marginLeft: "auto" }} >{user.name}</Text>
          </div>
          <div className="card-content">
            <Title level={5} className="title">Email</Title> 
            <Text style={{ marginLeft: "auto" }} >{user.email}</Text>
          </div>
          <div className="card-content">
            <Title level={5} className="title">Mobile</Title>
            <Text style={{ marginLeft: "auto" }} >{user.phone}</Text>
          </div>
          </Card>
      </div>
    </div>
  );
}

export default Dashboard;
