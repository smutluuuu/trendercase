import axios from 'axios';
import { POST } from '../app/api/register/route'; // Import POST function to use 
import { NextResponse } from 'next/server';

// Mock axios
jest.mock('axios');

describe('POST /api/register', () => {
  it('should register successfully and return a success message', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'testpass' }),
    };
    const mockResponse = NextResponse.next(); 

    const mockApiResponse = {
      data: {
        data: {
          PlayFabId: 'mockPlayFabId',
        },
      },
    };

    // PlayFab API mock response
    axios.post.mockResolvedValueOnce(mockApiResponse);

       // Calling the POST Api
    const response = await POST(mockRequest, mockResponse);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      message: 'User registered successfully',
    });
  });

  it('should return an error if registration fails', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'testpass' }),
    };
    const mockResponse = NextResponse.next();

    // Mock PlayFab API response
    axios.post.mockResolvedValueOnce({});

      // Calling the POST Api
    const response = await POST(mockRequest, mockResponse);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      message: 'Error registering user',
    });
  });

  it('should return an error if there is an exception', async () => {
    const mockRequest = {
      method: 'POST',
      text: async () => JSON.stringify({ username: 'testuser', email: 'test@example.com', password: 'testpass' }),
    };
    const mockResponse = NextResponse.next(); 

    // Mock an exception in the PlayFab API call
    axios.post.mockRejectedValueOnce(new Error('Network Error'));

    
  });
});