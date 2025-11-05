import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/tickets');
      setTickets(response.data);
    } catch (error) {
      message.error('获取工单列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'blue';
      case 'in-progress': return 'orange';
      case 'resolved': return 'green';
      case 'closed': return 'gray';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'green';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button type="link" onClick={() => navigate(`/tickets/${record._id}`)}>
          {text}
        </Button>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status === 'open' && '待处理'}
          {status === 'in-progress' && '处理中'}
          {status === 'resolved' && '已解决'}
          {status === 'closed' && '已关闭'}
        </Tag>
      )
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {priority === 'high' && '高'}
          {priority === 'medium' && '中'}
          {priority === 'low' && '低'}
        </Tag>
      )
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator',
      render: (creator) => creator?.username || '未知'
    },
    {
      title: '分配给',
      dataIndex: 'assignee',
      key: 'assignee',
      render: (assignee) => assignee?.username || '未分配'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt) => new Date(createdAt).toLocaleString()
    }
  ];

  return (
    <div className="ticket-list">
      <div className="ticket-list-header">
        <h2>工单列表</h2>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => navigate('/create-ticket')}
        >
          创建工单
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tickets}
        loading={loading}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TicketList;