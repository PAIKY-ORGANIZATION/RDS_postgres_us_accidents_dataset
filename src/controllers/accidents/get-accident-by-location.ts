import { Request, Response } from 'express';
import { GetAccidentByLocationSchemaType } from '../../zodSchemas/accidents-schema.js';
import { prisma } from '../../lib/prisma.js';
import { BadRequest } from 'custom-exceptions-express';

export const getAccidentByLocation = async(req: Request<{}, {}, GetAccidentByLocationSchemaType>, res: Response)=>{
    const  {body} = req


    const first100matchesByLocation = await prisma.us_accidents_filtered.findMany({
        where: body, //* "body" will be an object with OPTIONAL properties like {county, street, city, state}
        take: 100,
    })

    if(first100matchesByLocation.length === 0){
        throw new BadRequest('Could not find any matches. Please verify your input.')
    }


    const response: ServerResponse = {
        message: 'Success',
        success: true,
        data: first100matchesByLocation
    }

    res.send(response)
}