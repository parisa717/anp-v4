import { workshopFollowUpWorks } from '../../mockData'

export const workshopFollowUpWorksResolver = {
  getWorkshopFollowUpWorks() {
    return {
      works: workshopFollowUpWorks,
    }
  },
}
