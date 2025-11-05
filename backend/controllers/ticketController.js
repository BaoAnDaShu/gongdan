const { Ticket } = require('../models/models');

// 创建工单
const createTicket = async (req, res) => {
  try {
    const { title, description, priority, category } = req.body;
    const creator = req.user.id;
    
    const ticket = new Ticket({
      title,
      description,
      priority,
      category,
      creator
    });
    
    await ticket.save();
    
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取所有工单
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate('creator', 'username')
      .populate('assignee', 'username')
      .sort({ createdAt: -1 });
    
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 获取单个工单
const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('creator', 'username')
      .populate('assignee', 'username');
    
    if (!ticket) {
      return res.status(404).json({ message: '工单未找到' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 更新工单
const updateTicket = async (req, res) => {
  try {
    const { title, description, priority, category, status, assignee } = req.body;
    
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        category,
        status,
        assignee
      },
      { new: true }
    )
      .populate('creator', 'username')
      .populate('assignee', 'username');
    
    if (!ticket) {
      return res.status(404).json({ message: '工单未找到' });
    }
    
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// 删除工单
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: '工单未找到' });
    }
    
    res.json({ message: '工单已删除' });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
};