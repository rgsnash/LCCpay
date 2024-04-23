import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TransferFunds, VerifyAccount } from "../../apicalls/transactions";
import { ShowLoading, HideLoading } from "../../redux/loadersSlice";
import { ReloadUser } from "../../redux/usersSlice";

function TransferFundsModal({
  showTransferFundsModal,
  setShowTransferFundsModal,
  reloadData,
}) {
  const { user } = useSelector((state) => state.users);
  const [isVerified, setIsVerified] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const verifyAccount = async () => {
    try {
      dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("receiver"),
      });
      dispatch(HideLoading());
      if (response.success) {
        setIsVerified(true);
        message.success(response.message);
      } else {
        setIsVerified(false);
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      setIsVerified(false);
      message.error("An error occurred while verifying the account");
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const payload = {
        ...values,
        sender: user._id,
        status: "success",
        reference: values.reference || "no reference",
      };
      const response = await TransferFunds(payload);
      if (response.success) {
        reloadData();
        setShowTransferFundsModal(false);
        message.success(response.message);
        dispatch(ReloadUser(true));
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      message.error(error.message);
      dispatch(HideLoading());
    }
  };

  return (
    <Modal
      title="Transfer Funds"
      visible={showTransferFundsModal}
      onCancel={() => setShowTransferFundsModal(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Receiver Account Number"
          name="receiver"
          rules={[{ required: true, message: "Please input account number" }]}
        >
          <Input />
        </Form.Item>
        <Button onClick={verifyAccount}>Verify Account</Button>
        
        {isVerified && (
          <div style={{ padding: "10px", backgroundColor: "#f0f2f5", borderRadius: "5px", marginTop: "10px" }}>
            Account verified successfully
          </div>
        )}
        
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the amount" },
            { max: user.balance, message: "Insufficient Balance" },
          ]}
        >
          <Input type="number" max={user.balance} />
        </Form.Item>
        <Form.Item label="Reference" name="reference">
          <Input.TextArea />
        </Form.Item>
        <div style={{ textAlign: "right" }}>
          <Button onClick={() => setShowTransferFundsModal(false)}>Cancel</Button>
          {isVerified && (
            <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }}>
              Transfer
            </Button>
          )}
        </div>
      </Form>
    </Modal>
  );
}

export default TransferFundsModal;
