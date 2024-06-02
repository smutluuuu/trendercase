import axios from 'axios';
import jwt from 'jsonwebtoken';
import { POST } from '../app/api/login/route'; // Import POST function to use 
import { NextResponse } from 'next/server';

// Mock axios
jest.mock('axios');

describe('POST /api/login', () => {
  it('should login successfully and return a token', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', password: 'testpass' }),
    };
    const mockResponse = NextResponse.next(); 

    const mockApiResponse = {
      data: {
        status: 'OK',
        data: {
          SessionTicket: 'mockSessionTicket',
          id: 'mockId',
          username: 'testuser',
        },
      },
    };

    // Mock PlayFab API response
    axios.post.mockResolvedValueOnce(mockApiResponse);

    // Mock JWT sign method
    const token = jwt.sign({ id: 'mockId', username: 'testuser' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Calling the POST Api
    const response = await POST(mockRequest, mockResponse);

    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.message).toBe('Successfully logged in.');
    expect(jsonResponse.token).toBeDefined();
  });

  it('should return an error if login fails', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', password: 'wrongpass' }),
    };
    const mockResponse = NextResponse.next(); 

    // PlayFab API Mock response
    axios.post.mockResolvedValueOnce({});

    // Call the POST handler
    const response = await POST(mockRequest, mockResponse);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: 'Invalid credentials',
    });
  });

  it('should return an error if there is an exception', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', password: 'testpass' }),
    };
    const mockResponse = NextResponse.next(); 

    // Mock exception in the PlayFab API call
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    // Call the POST handler
    const response = await POST(mockRequest, mockResponse);

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      message: 'Error logging in',
      error: 'Network Error',
    });
  });
});
