import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext.jsx';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`;

const ProfileCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
  border: none;
  border-radius: 10px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const RoleBadge = styled.span`
  background: ${props => props.role === 'admin' ? '#ff6b6b' : '#4ecdc4'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  
  .label {
    font-weight: 600;
    opacity: 0.8;
  }
  
  .value {
    font-weight: 500;
  }
`;

const Profile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile (in real app, would call API)
    alert('Profile updated successfully!');
    setEditing(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Title>Profile</Title>
      
      <ProfileCard>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <RoleBadge role={user?.role}>{user?.role}</RoleBadge>
        </div>
        
        {!editing ? (
          <div>
            <InfoRow>
              <span className="label">Name:</span>
              <span className="value">{user?.name}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Email:</span>
              <span className="value">{user?.email}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Phone:</span>
              <span className="value">{user?.phone || 'Not provided'}</span>
            </InfoRow>
            <InfoRow>
              <span className="label">Role:</span>
              <span className="value">{user?.role}</span>
            </InfoRow>
            
            <Button onClick={() => setEditing(true)} style={{width: '100%', marginTop: '1rem'}}>
              Edit Profile
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            
            <div style={{display: 'flex', gap: '1rem'}}>
              <Button type="submit" style={{flex: 1}}>Save Changes</Button>
              <Button 
                type="button" 
                onClick={() => setEditing(false)}
                style={{flex: 1, background: '#6c757d'}}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </ProfileCard>
    </Container>
  );
};

export default Profile;