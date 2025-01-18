import { workshopFollowUpWorks } from '../../mockData'

export const workshopFollowUpWorksResolver = {
  getWorkshopFollowUpWorks() {
    return {
      works: workshopFollowUpWorks,
    }
  },
  getWorkshopFollowUpWork: (_: unknown) => {
    return workshopFollowUpWorks[0]
  },
}
