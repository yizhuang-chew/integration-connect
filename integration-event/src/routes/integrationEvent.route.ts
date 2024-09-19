import { Router } from 'express';

import { logger } from '../utils/logger.utils';
import { post } from '../controllers/integration.controller';

const integrationEventRouter: Router = Router();

integrationEventRouter.post('/', (req, res, next) => {
  logger.info('Event message received');
  try {
    post(req, res);
  } catch (error) {
    next(error);
  }
});

export default integrationEventRouter;
