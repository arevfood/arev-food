type MenstrualPhase = {
  phase: string
  description: string
  daysUntilNext: number
}

export function getMenstrualPhase({
  lastPeriod,
  cycleLength,
}: {
  lastPeriod: string
  cycleLength: number
}): MenstrualPhase {
  const startDate = new Date(lastPeriod)
  const today = new Date()

  const diffDays =
    Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) % cycleLength

  const daysUntilNext = cycleLength - diffDays

  switch (true) {
    case diffDays >= 0 && diffDays <= 4:
      return {
        phase: 'Menstrual Phase',
        description: 'Your period is here. Rest and focus on hydration.',
        daysUntilNext,
      }
    case diffDays >= 5 && diffDays <= 13:
      return {
        phase: 'Follicular Phase',
        description: 'Energy levels are rising. Great time for productivity.',
        daysUntilNext,
      }
    case diffDays === 14:
      return {
        phase: 'Ovulation Phase',
        description: 'You’re most fertile now. Energy and mood peak.',
        daysUntilNext,
      }
    case diffDays >= 15 && diffDays <= cycleLength:
      return {
        phase: 'Luteal Phase',
        description: 'Body is winding down. Prioritize rest and calm meals.',
        daysUntilNext,
      }
    default:
      return {
        phase: 'Unknown Phase',
        description: 'Unable to determine menstrual phase.',
        daysUntilNext,
      }
  }
}
