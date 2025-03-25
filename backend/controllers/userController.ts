import { Request, Response } from 'express';

// Dummy users data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Get all users
export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

// Get a user by ID
export const getUserById = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  const user = users.find(u => u.id === userId);
  if (!user) {
     res.status(404).json({ message: 'User not found' });
     return;
  }

   res.status(200).json(user);
};

// Create a new user
export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) {
     res.status(400).json({ message: 'Name and email are required' });
     return;
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

// Update an existing user
export const updateUser = (req: Request, res: Response) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
     res.status(404).json({ message: 'User not found' });
     return;
  }

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
};

// Delete a user
export const deleteUser = (req: Request, res: Response) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
     res.status(404).json({ message: 'User not found' });
     return;
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted successfully' });
};
