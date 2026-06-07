import * as z from 'zod';

const InternalResponseSchema = z.object({
    success: z.boolean().default(true),
    data: z.any().nullable().default(null),
    message: z.string().default('OK'),
    code: z.number().default(0)
})

export type InternalResponse = z.infer<typeof InternalResponseSchema>;

export function formInternalResponse(res: string | number | Array<any> | null): InternalResponse;

export function formInternalResponse(res: Record<string, any> | null): InternalResponse;

export function formInternalResponse(res: unknown): InternalResponse {
    if (res === null || typeof (res) === 'string' || typeof (res) === 'number' || Array.isArray(res) ||
        (typeof (res) === 'object' && (typeof (res as Record<string, unknown>).success !== 'boolean'))) {
        const internal_res: InternalResponse = InternalResponseSchema.parse({
            data: res
        })
        return internal_res;
    }

    if (typeof (res) === 'object' && (typeof (res as Record<string, unknown>).success === 'boolean')) {
        const internal_res: InternalResponse = InternalResponseSchema.parse(res);
        return internal_res;
    }

    throw new Error(`Invalid response type: ${typeof (res)}`);
}
