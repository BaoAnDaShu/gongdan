import React, { useState } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const CreateTicket = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/tickets', values);
      message.success('工单创建成功');
      navigate('/tickets');
    } catch (error) {
      message.error('工单创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket">
      <h2>创建工单</h2>
      <Form
        name="create_ticket_form"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入工单标题!' }]}
        >
          <Input placeholder="请输入工单标题" />
        </Form.Item>
        
        <Form.Item
          label="描述"
          name="description"
          rules={[{ required: true, message: '请输入工单描述!' }]}
        >
          <TextArea rows={4} placeholder="请输入工单详细描述" />
        </Form.Item>
        
        <Form.Item
          label="优先级"
          name="priority"
          rules={[{ required: true, message: '请选择优先级!' }]}
        >
          <Select placeholder="请选择优先级">
            <Option value="low">低</Option>
            <Option value="medium">中</Option>
            <Option value="high">高</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: '请输入工单分类!' }]}
        >
          <Input placeholder="例如：技术问题、功能请求、Bug报告等" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建工单
          </Button>
          <Button 
            style={{ marginLeft: 10 }} 
            onClick={() => navigate('/tickets')}
          >
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateTicket;