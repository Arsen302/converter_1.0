import { Request, Response } from 'express';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {}

  async registration(req: Request, res: Response): Promise<void> {}
}

export default new AuthController();
