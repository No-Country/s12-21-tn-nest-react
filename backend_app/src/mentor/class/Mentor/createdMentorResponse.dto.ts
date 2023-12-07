import { ApiProperty } from '@nestjs/swagger';

export class createdMentorResponse {
  @ApiProperty({
    description: 'Mentor created successfully status ok',
    example: 201,
  })
  status: number;
  @ApiProperty({
    description: 'Mentor created successfully message',
    example: 'mentor added successfully',
  })
  message: string;
}
