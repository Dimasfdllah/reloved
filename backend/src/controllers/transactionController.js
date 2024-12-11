const midtransService = require("../services/midtransService");
const Transaction = require("../models/Transactions");
const Order = require("../models/Orders");

const transactionController = {};

// Create a new transaction
transactionController.createTransaction = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order by ID and populate user with certain data
    const order = await Order.findById(orderId).populate({
      path: "user",
      select: "_id name username email phone role", 
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    const transactionDetails = {
      transaction_details: {
        order_id: `ORDER-${order._id}`,
        gross_amount: order.total_price,
      },
      customer_details: {
        first_name: order.shippingAddress.name,
        email: order.user.email,
        phone: order.shippingAddress.phone,
      },
    };

    // Call Midtrans service to create the transaction
    const midtransResponse = await midtransService.createTransaction(transactionDetails);

    const transaction = new Transaction({
      order: order._id,
      user: order.user,
      amount: order.total_price,
      payment_url: midtransResponse.redirect_url,
      transaction_id: transactionDetails.transaction_details.order_id,
      payment_status: "pending", // Set initial payment status to pending
    });

    // Save the transaction to the database
    await transaction.save();

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dibuat",
      data: {
        order: transaction.order,
        user: transaction.user,
        amount: transaction.amount,
        payment_status: "pending", // Default payment status
        payment_url: transaction.payment_url,
        transaction_id: transaction.transaction_id,
        _id: transaction._id,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat transaksi",
      error: error.message,
    });
  }
};

// Get all transactions
transactionController.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("order").populate("user");
    res.status(200).json({ success: true, message: "Daftar transaksi berhasil diambil", data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat mengambil daftar transaksi", error: error.message });
  }
};

// Get a transaction by ID
transactionController.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findById(id).populate("order").populate("user");
    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }
    res.status(200).json({ success: true, message: "Detail transaksi berhasil diambil", data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan saat mengambil detail transaksi", error: error.message });
  }
};

// Handle Midtrans callback to update transaction status
transactionController.handleMidtransCallback = async (req, res) => {
  try {
    const { order_id, transaction_status, payment_type } = req.body;

    // Find the transaction by order_id
    const transaction = await Transaction.findOne({ transaction_id: order_id });

    if (!transaction) {
      return res.status(404).json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    // Update the transaction status based on the callback data from Midtrans
    transaction.transaction_status = transaction_status;
    transaction.payment_type = payment_type;

    // Set payment status based on transaction status
    if (transaction_status === "settlement") {
      transaction.payment_status = "paid";
    } else if (transaction_status === "deny" || transaction_status === "cancel") {
      transaction.payment_status = "failed";
    } else if (transaction_status === "expire") {
      transaction.payment_status = "expired";
    }

    // Save the updated transaction
    await transaction.save();

    res.status(200).json({
      success: true,
      message: "Status transaksi berhasil diperbarui",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memperbarui status transaksi",
      error: error.message,
    });
  }
};

module.exports = transactionController;
