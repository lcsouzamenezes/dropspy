import {
  LOGGER,
  VERSION,
} from '../../../../configs/configs';
import Master from '../../../clusters/master/models/Master';

import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {

  const shouldSkiApi = req.query.skip_api;

  LOGGER(`/${shouldSkiApi ? '?skipApi=' + shouldSkiApi : ''}`, { from: 'SERVER', pid: true });

  try {
    const masterCluster: Master = global['MASTER']?.masterCluster;
    if (!masterCluster) { throw new Error('Objeto MASTER ainda não foi definido'); }

    const { readyWorkers } = masterCluster;

    res.send(`DROPSPY IS RUNNING AT VERSION ${VERSION} - ${readyWorkers}\n`);

  } catch (e) {
    res.json({ error: e.message });
  }

}
