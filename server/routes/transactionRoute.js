const express = require("express");
const router = express.Router();;
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

const authMiddlewares = require("../middlewares/authMiddlewares");


router.post("/transfer-funds", authMiddlewares, async (req, res) => {
  try {
    // save the transaction
    const newTransaction = new Transaction(req.body);
    await newTransaction.save();

    // decrease the sender's balance
    await User.findByIdAndUpdate(req.body.sender, {
      $inc: { balance: -req.body.amount },
    });

    // increase the receiver's balance
    await User.findByIdAndUpdate(req.body.receiver, {
      $inc: { balance: req.body.amount },
    });

    res.send({
      message: "Transaction successful",
      data: newTransaction,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while processing the transaction",
      error: error.message, // Send the actual error message for debugging
      success: false,
    });
  }
});

router.post("/verify-account", authMiddlewares, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.receiver });
    if (user) {
      res.send({
        message: "Account verified",
        data: user,
        success: true,
      });
    } else {
      res.status(404).send({ // Send a 404 status code to indicate account not found
        message: "Account not found",
        success: false,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while verifying the account",
      error: error.message,
      success: false,
    });
  }
});

router.post(
  "/get-all-transactions-by-user",
  authMiddlewares,
  async (req, res) => {
    try {
      const transactions = await Transaction.find({
        $or: [{ sender: req.body.userId }, { receiver: req.body.userId }],
      })
        .sort({ createdAt: -1 })
        .populate("sender")
        .populate("receiver");
      res.send({
        message: "Transactions fetched",
        data: transactions,
        success: true,
      });
    } catch (error) {
      res.send({
        message: "Transactions not fetched",
        data: error.message,
        success: false,
      });
    }
  }
);

module.exports = router;
