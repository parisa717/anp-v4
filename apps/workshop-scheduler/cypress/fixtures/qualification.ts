import { GetQualificationsQuery } from '@/entities/qualification/api/Qualification.generated'

export const GET_QUALIFICATIONS_DEFAULT_RESPONSE: GetQualificationsQuery = {
  getQualifications: {
    qualifications: [
      { id: '0', name: 'Brake and Transmission Technicians', code: 'TECHNICIANS' },
      { id: '1', name: 'Mechanics', code: 'MECHANICS' },
    ],
  },
}
