import { postRandomNumbers } from '../app/page';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('postRandomNumbers', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return an error message if numbers are not generated', async () => {
    const result = await postRandomNumbers('', '', { session: null });
    expect(result).toBe('Please generate numbers!');
  });

  it('should return a success message if numbers are saved successfully', async () => {
    const randomNumber1 = '123';
    const randomNumber2 = '456';
    const session = { user: { token: 'mockedToken' } };
    
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Numbers successfully saved' }), { status: 201 });
    
    const result = await postRandomNumbers(randomNumber1, randomNumber2, session);
    expect(result).toBe('Numbers successfully saved to Database!');
  });

  it('should return an error message if input is invalid', async () => {
    const randomNumber1 = '123';
    const randomNumber2 = '456';
    const session = { user: { token: 'mockedToken' } };
    
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Invalid input' }), { status: 400 });
    
    const result = await postRandomNumbers(randomNumber1, randomNumber2, session);
    expect(result).toBe('Invalid input!');
  });

  it('should return an error message if authorization token is missing', async () => {
    const randomNumber1 = '123';
    const randomNumber2 = '456';
    const session = { user: { token: 'mockedToken' } };
    
    fetchMock.mockResponseOnce(JSON.stringify({ message: 'Authorization token missing' }), { status: 401 });
    
    const result = await postRandomNumbers(randomNumber1, randomNumber2, session);
    expect(result).toBe('Authorization token missing !');
  });

  it('should return a generic error message if an exception occurs', async () => {
    const randomNumber1 = '123';
    const randomNumber2 = '456';
    const session = { user: { token: 'mockedToken' } };
    
    fetchMock.mockRejectOnce(new Error('Network error'));
    
    const result = await postRandomNumbers(randomNumber1, randomNumber2, session);
    expect(result).toBe('There is a problem ocurred while saving numbers to database try again.');
  });
});
