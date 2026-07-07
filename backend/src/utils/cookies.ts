import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Cookies = createParamDecorator((data: string | undefined, ctx: ExecutionContext): Record<string, string> | string | undefined => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies[data] : request.cookies;
});