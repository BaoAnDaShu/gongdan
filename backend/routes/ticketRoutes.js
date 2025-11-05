const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} = require('../controllers/ticketController');

const ticketRoutes = (app) => {
  // 创建工单
  app.post('/api/tickets', createTicket);
  
  // 获取所有工单
  app.get('/api/tickets', getTickets);
  
  // 获取单个工单
  app.get('/api/tickets/:id', getTicketById);
  
  // 更新工单
  app.put('/api/tickets/:id', updateTicket);
  
  // 删除工单
  app.delete('/api/tickets/:id', deleteTicket);
};

module.exports = ticketRoutes;