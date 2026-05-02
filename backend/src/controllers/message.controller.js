import Message from "../models/message.model.js";

export const createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "message is successfully sent",
      data: newMessage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ created: -1 });

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }
    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
