import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.js';
import { BadRequest } from 'custom-exceptions-express';

export const getAccidentByIndex = async(req: Request<{index: string}>, res: Response)=>{
	const {index} = req.params;


	//*  Simple validation without Zod
	if(!index || index === '' || typeof index !== 'string'){
		throw new BadRequest('Id is required')
	}
	
	
	const indexNumber = Number(index)

	//* Get the highest index
	const rowWithHighestIndex  = await prisma.us_accidents_filtered.findFirst({
		orderBy: {index: 'desc'}, //$ Get the highest index
		select: {index: true} //$ Only select the ID
	})

	const highestIndex = rowWithHighestIndex?.index!

	//* Ensure that requester provided an ID in an allowed range
	if((indexNumber > highestIndex || indexNumber < 0 )){
		throw  new BadRequest('Index must be between 0 and ' + highestIndex)
	}

	//*  Get accident by index
	const accident = await prisma.us_accidents_filtered.findFirst({
		where: {index: indexNumber},
	})


	const response: ServerResponse = {
		message: 'Successfully fetched accident document',
		success: true,
		data: accident
	}

	res.send(response)
}