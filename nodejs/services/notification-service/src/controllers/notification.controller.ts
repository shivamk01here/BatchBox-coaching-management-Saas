import { Request, Response } from 'express';
import { sendWhatsappNotification } from '../services/whatsapp.service';

export const manualNotify = async (req: Request, res: Response) => {
  try {
    const { studentName, phoneNumber, message } = req.body;
    await sendWhatsappNotification({ studentName, phoneNumber, message });

    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
