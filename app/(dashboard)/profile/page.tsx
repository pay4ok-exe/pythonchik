'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, CardFooter, Button, Input, Tabs, Tab, Divider } from '@heroui/react';

export default function Profile() {
  // Mock user data
  const [user, setUser] = useState({
    id: 1,
    username: 'python_coder',
    email: 'coder@example.com',
    firstName: 'Alex',
    lastName: 'Smith',
    avatarUrl: null,
    joinDate: '2025-01-15',
    completedLessons: 5,
    totalLessons: 20,
    achievements: 3,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    username: user.username,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    // In a real app, this would send the data to an API
    setUser(prev => ({
      ...prev,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      username: formData.username,
    }));
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  // Mock achievements data
  const achievements = [
    { id: 1, title: 'First Code', description: 'Ran your first Python program', date: '2025-01-16', icon: '🚀' },
    { id: 2, title: 'Bug Hunter', description: 'Fixed 5 bugs in your code', date: '2025-02-01', icon: '🐛' },
    { id: 3, title: 'Loop Master', description: 'Completed the loops and iterations module', date: '2025-03-10', icon: '🔄' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account settings and view your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardBody className="flex flex-col items-center py-8">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl font-bold text-gray-400">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
                )}
              </div>
              <h2 className="text-xl font-bold">{user.firstName} {user.lastName}</h2>
              <p className="text-gray-500 mb-1">@{user.username}</p>
              <p className="text-sm text-gray-500 mb-4">Member since {new Date(user.joinDate).toLocaleDateString()}</p>
              
              <div className="grid grid-cols-2 gap-4 w-full mt-2">
                <div className="text-center p-3 bg-indigo-50 rounded">
                  <div className="text-xl font-bold text-indigo-600">{user.completedLessons}</div>
                  <div className="text-xs text-gray-500">Lessons Completed</div>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded">
                  <div className="text-xl font-bold text-indigo-600">{user.achievements}</div>
                  <div className="text-xs text-gray-500">Achievements</div>
                </div>
              </div>
              
              <Button 
                color="primary" 
                className="mt-6"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <Tabs aria-label="Profile options">
                <Tab key="account" title="Account Information">
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <Input
                          label="First Name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          isRequired
                        />
                        <Input
                          label="Last Name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          isRequired
                        />
                        <Input
                          label="Username"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          isRequired
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          isRequired
                        />
                      </div>

                      <Divider className="my-6" />
                      <h3 className="text-lg font-medium mb-4">Change Password</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Current Password"
                          name="currentPassword"
                          type="password"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="md:col-span-2"
                        />
                        <Input
                          label="New Password"
                          name="newPassword"
                          type="password"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                        />
                        <Input
                          label="Confirm New Password"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="flex justify-end gap-2 mt-6">
                        <Button color="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                          <p className="mt-1">{user.firstName} {user.lastName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Username</h3>
                          <p className="mt-1">@{user.username}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                          <p className="mt-1">{user.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                          <p className="mt-1">{new Date(user.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab>
                <Tab key="achievements" title="Achievements">
                  <div className="space-y-4 mt-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-start p-4 bg-gray-50 rounded-lg">
                        <div className="bg-indigo-100 rounded-full p-3 mr-4 text-2xl">
                          {achievement.icon}
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.title}</h3>
                          <p className="text-sm text-gray-500">{achievement.description}</p>
                          <p className="text-xs text-gray-400 mt-1">Earned on {new Date(achievement.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="privacy" title="Privacy & Settings">
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-gray-500">Receive email updates about your progress</p>
                        </div>
                        <Input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Weekly Digest</h4>
                          <p className="text-sm text-gray-500">Get a weekly summary of new lessons and features</p>
                        </div>
                        <Input type="checkbox" defaultChecked />
                      </div>
                    </div>

                    <Divider className="my-6" />
                    
                    <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Show Progress to Others</h4>
                          <p className="text-sm text-gray-500">Allow other users to see your learning progress</p>
                        </div>
                        <Input type="checkbox" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Show Achievements</h4>
                          <p className="text-sm text-gray-500">Display your earned achievements on your public profile</p>
                        </div>
                        <Input type="checkbox" defaultChecked />
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}