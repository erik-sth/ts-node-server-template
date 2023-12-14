import mongoose from 'mongoose';
import connectToDatabase from '../src/startup/db';

jest.mock('mongoose');

describe('Database Connection', () => {
    it('should connect to the database', async () => {
        const mockConnect = jest.spyOn(mongoose, 'connect');
        await connectToDatabase();
        expect(mockConnect).toHaveBeenCalledWith(expect.any(String));
    });
});
