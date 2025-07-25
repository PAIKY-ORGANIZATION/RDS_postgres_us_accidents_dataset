import {z} from 'zod'


export const getAccidentByLocationSchema = z.object({
    body: z.object({
        county:  z.string().optional(),
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().max(2, {message: 'State must be 2 characters in this format: "NY"'}).optional(),
    })
})

export type GetAccidentByLocationSchemaType = z.infer<typeof getAccidentByLocationSchema>['body']

