import React, { useState, useEffect } from 'react';
import { Descriptions, Button, Tag, message, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const TicketDetail = () => {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchTicket = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/tickets/${id}`);
      setTicket(response.data);
    } catch (error) {
      message.error('获取工单详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (!ticket) {
    return <div>加载中...</div>;
  }

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

  return (
    <div className="ticket-detail">
      <Space style={{ marginBottom: 16 }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/tickets')}
        >
          返回列表
        </Button>
      </Space>
      <Descriptions
        title="工单详情"
        bordered
        column={{ xs: 1, sm: 2 }}
        loading={loading}
      >
        <Descriptions.Item label="标题">{ticket.title}</Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={getStatusColor(ticket.status)}>
            {ticket.status === 'open' && '待处理'}
            {ticket.status === 'in-progress' && '处理中'}
            {ticket.status === 'resolved' && '已解决'}
            {ticket.status === 'closed' && '已关闭'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="优先级">
          <Tag color={getPriorityColor(ticket.priority)}>
            {ticket.priority === 'high' && '高'}
            {ticket.priority === 'medium' && '中'}
            {ticket.priority === 'low' && '低'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="分类">{ticket.category}</Descriptions.Item>
        <Descriptions.Item label="创建者">{ticket.creator?.username || '未知'}</Descriptions.Item>
        <Descriptions.Item label="分配给">{ticket.assignee?.username || '未分配'}</Descriptions.Item>
        <Descriptions.Item label="创建时间" span={2}>
          {new Date(ticket.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="描述" span={2}>
          {ticket.description}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default TicketDetail;