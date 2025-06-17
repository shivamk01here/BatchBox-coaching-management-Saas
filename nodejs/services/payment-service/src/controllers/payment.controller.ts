import { Request, Response } from 'express';

export const createPayment = async (req: Request, res: Response) => {
  const { studentId, amount, courseName } = req.body;

  // TODO: Add DB save logic here
  // TODO: Emit Kafka event

  return res.status(201).json({
    message: 'Payment processed successfully',
    data: { studentId, amount, courseName },
  });
};
