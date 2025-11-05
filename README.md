# 工单系统启动说明

## 系统要求
- Node.js (v14或更高版本)
- MongoDB
- npm 或 yarn

## 安装步骤

### 1. 启动MongoDB服务
确保MongoDB服务已经启动：
- 如果使用MongoDB Community Server，请先启动mongod服务
- 如果使用Docker，可以运行：`docker run -d -p 27017:27017 mongo`

### 2. 安装后端依赖
```bash
cd backend
npm install
```

### 3. 启动后端服务器
```bash
cd backend
npm start
```
或使用nodemon：
```bash
npx nodemon server.js
```

### 4. 安装前端依赖
```bash
cd frontend
npm install
```

### 5. 启动前端开发服务器
```bash
cd frontend
npm start
```

## 项目结构
```
工单系统/
├── backend/
│   ├── models/
│   │   └── models.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ticketController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── ticketRoutes.js
│   ├── server.js
│   └── .env
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── TicketList.js
    │   │   ├── TicketDetail.js
    │   │   └── CreateTicket.js
    │   └── App.js
    └── package.json
```

## API接口
- 用户注册：POST /api/auth/register
- 用户登录：POST /api/auth/login
- 创建工单：POST /api/tickets
- 获取工单列表：GET /api/tickets
- 获取工单详情：GET /api/tickets/:id
- 更新工单：PUT /api/tickets/:id
- 删除工单：DELETE /api/tickets/:id

## 环境变量
在backend/.env文件中配置：
```
MONGODB_URI=mongodb://127.0.0.1:27017/ticket-system
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 功能说明
1. 用户注册和登录
2. 创建工单
3. 查看工单列表
4. 查看工单详情
5. 管理员功能（分配工单、更新状态等）

## 前端页面
- 登录页：/login
- 注册页：/register
- 仪表盘：/dashboard
- 工单列表：/tickets
- 创建工单：/create-ticket
- 工单详情：/tickets/:id