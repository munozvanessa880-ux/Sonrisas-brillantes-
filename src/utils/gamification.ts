import { Achievement, UserProfile, PointTransaction } from '../types/dental';

export function calculateLevel(points: number): { level: number; title: string; nextLevelPoints: number; currentLevelFloor: number } {
  if (points < 100) {
    return { level: 1, title: 'Iniciado Dental', nextLevelPoints: 100, currentLevelFloor: 0 };
  } else if (points < 300) {
    return { level: 2, title: 'Cuidador Bucal Constante', nextLevelPoints: 300, currentLevelFloor: 100 };
  } else if (points < 600) {
    return { level: 3, title: 'Sonrisa Radiante', nextLevelPoints: 600, currentLevelFloor: 300 };
  } else if (points < 1000) {
    return { level: 4, title: 'Embajador Sonrisas Brillantes', nextLevelPoints: 1000, currentLevelFloor: 600 };
  } else {
    return { level: 5, title: 'Maestro del Esmalte Dorado', nextLevelPoints: 2000, currentLevelFloor: 1000 };
  }
}

export function evaluateAchievements(
  currentAchievements: Achievement[],
  userProfile: UserProfile
): { updatedAchievements: Achievement[]; newlyUnlocked: Achievement[]; pointsGained: number } {
  const updated = [...currentAchievements];
  const newlyUnlocked: Achievement[] = [];
  let pointsGained = 0;

  updated.forEach((ach, index) => {
    if (ach.unlocked) return;

    let newProgress = ach.progress;
    let shouldUnlock = false;

    switch (ach.id) {
      case 'ach-streak-7':
        newProgress = Math.min(ach.maxProgress, userProfile.brushingStreak);
        if (newProgress >= ach.maxProgress) shouldUnlock = true;
        break;

      case 'ach-mouthwash-expert':
        newProgress = Math.min(ach.maxProgress, userProfile.totalMouthwash);
        if (newProgress >= ach.maxProgress) shouldUnlock = true;
        break;

      case 'ach-floss-master':
        newProgress = Math.min(ach.maxProgress, userProfile.totalFlossings);
        if (newProgress >= ach.maxProgress) shouldUnlock = true;
        break;

      case 'ach-timer-master':
        newProgress = Math.min(ach.maxProgress, userProfile.totalTimerCompletions);
        if (newProgress >= ach.maxProgress) shouldUnlock = true;
        break;

      case 'ach-score-500':
        newProgress = Math.min(ach.maxProgress, userProfile.points);
        if (newProgress >= ach.maxProgress) shouldUnlock = true;
        break;

      case 'ach-first-brush':
        if (userProfile.totalBrushings >= 1) {
          newProgress = 1;
          shouldUnlock = true;
        }
        break;
    }

    if (newProgress !== ach.progress || shouldUnlock) {
      const updatedAch: Achievement = {
        ...ach,
        progress: newProgress,
        unlocked: shouldUnlock,
        unlockedAt: shouldUnlock ? new Date().toISOString() : undefined
      };
      updated[index] = updatedAch;

      if (shouldUnlock) {
        newlyUnlocked.push(updatedAch);
        pointsGained += updatedAch.pointsReward;
      }
    }
  });

  return { updatedAchievements: updated, newlyUnlocked, pointsGained };
}
