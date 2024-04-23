import React, { useEffect } from "react";
import { message, Table, Typography, Button } from "antd";
import TransferFundsModal from "./TransferFundsModal";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetTransactionsOfUser } from "../../apicalls/transactions";
import moment from "moment";

function Transactions() {
  const [showTransferFundsModal, setShowTransferFundsModal] = React.useState(false);
  const [data, setData] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Transaction ID",
      dataIndex: "_id",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text, record) => {
        if (record.sender._id === record.receiver._id) {
          return "Deposit";
        } else if (record.sender._id === user._id) {
          return "Debit";
        } else return "Credit";
      },
    },
    {
      title: "Reference Account",
      dataIndex: "",
      render: (text, record) => (
        <Typography.Text>
          {record.sender._id === user._id
            ? `${record.receiver.name}`
            : `${record.sender.name} `}
        </Typography.Text>
      ),
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsOfUser();
      if (response.success) {
        setData(response.data);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography.Title level={3}>Transactions</Typography.Title>
        <div>
          <Button type="default" onClick={() => setShowTransferFundsModal(true)}>
            Transfer Funds
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} className="mt-2" />

      {showTransferFundsModal && (
        <TransferFundsModal
          showTransferFundsModal={showTransferFundsModal}
          setShowTransferFundsModal={setShowTransferFundsModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Transactions;
