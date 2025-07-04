import { Request } from 'express';
import { THttpError } from '../types/types';
import responseMessage from '../constant/responseMessage';
import config from '../config/config';
import { EApplicationEnvironment } from '../constant/application';
import logger from './logger';

export default (err: Error | unknown, req: Request, errorStatusCode: number = 500): THttpError =>{
    const errorObj: THttpError = {
        success: false,
        statusCode: errorStatusCode,
        request:{
            ip: req.ip || null,
            method: req.method,
            url: req.originalUrl,
        },
        message: err instanceof Error ? err.message : responseMessage.FAIL,
        data: null,
        trace: err instanceof Error ? {error: err.stack} : null
    }

    logger.error('CONTROLLER_ERROR',{
        meta: errorObj
    })

    if(config.ENV === EApplicationEnvironment.PRODUCTION){
        delete errorObj.request.ip;
    }

    return errorObj
}