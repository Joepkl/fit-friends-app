import type SingleAchievement from "@/constants/SingleAchievement";

export const MonthlyAchievements = Object.freeze({
  0: {
    title: "Consistency",
    description: "Meet the personal frequency goal.",
    maxLevel: 3,
    levels: {
      0: {
        level: "5 weeks",
        points: 5,
      },
      1: {
        level: "10 weeks",
        points: 10,
      },
      2: {
        level: "15 weeks",
        points: 15,
      },
    },
    category: 0,
    id: 1,
  },
  1: {
    title: "Competitor",
    description: "Collect points in the leaderboard competition.",
    maxLevel: 3,
    levels: {
      0: {
        level: "10 pts. collected.", 
        points: 5,
      },
      1: {
        level: "20 pts. collected.",
        points: 10,
      },
      2: {
        level: "30 pts. collected.",
        points: 15,
      },
    },
    category: 0,
    id: 2,
  },
  2: {
    title: "Gym Rat",
    description: "Visit the gym this month.",
    maxLevel: 3,
    levels: {
      0: {
        level: "5 times",
        points: 5,
      },
      1: {
        level: "10 times",
        points: 10,
      },
      2:{
        level: "15 times",
        points: 15,
      },
    },
    category: 0,
    id: 3,
  },
  3: {
    title: "Achiever",
    description: "Accomplish different achievements this month.",
    maxLevel: 3,
    levels: {
      0: {
        level: "2 achievements",
        points: 5,
      },
      1: {
        level: "4 achievements",
        points: 10,
      
      },
      2: {
        level: "6 achievements",
        points: 15,
      },
    },
    category: 0,
    id: 4,
  },
  4: {
    title: "Cross Trainer",
    description: "Accomplish achievements from different muscle groups.",
    maxLevel: 3,
    levels: {
      0: {
        level: "2 muscle groups",
        points: 5,
      },
      1: {
        level: "4 muscle groups",
        points: 10,
      },
      2: {
        level: "6 muscle groups",
        points: 15,
      },
    },
    category: 0,
    id: 5,
  },
  5: {
    title: "Social Life",
    description: "Commented on different posts this month.",
    maxLevel: 3,
    levels: {
      0: {
        level: "3 posts",
        points: 5,
      },
      1: {
        level: "6 posts",
        points: 10,
      },
      2: {
        level: "9 posts",
        points: 15,
      },
    },
    category: 0,
    id: 6,
  },
});

export const ChestAchievements = Object.freeze({
  0: {
    title: "Cable flies",
    description: "In order to do cable flies sit on a bench, and move the arm through an arc against resistance with the elbow at a fixed angle.",
    maxLevel: 6,
    levels: {
      0: {
        level: "5 kg",
        points: 5,
      },
      1: {
        level: "10 kg",
        points: 10,
      },
      2: {
        level: "15 kg",
        points: 15,
      },
      3: {
        level: "20 kg",
        points: 20,
      },
      4: {
        level: "25 kg",
        points: 25,
      },
      5: {
        level: "30 kg",
        points: 30,
      },
    },
    category: 1,
    id: 7,
  },
  1: {
    title: "Machine flies",
    description: "In order to do machine flies you sit upright and move the weight by bringing your extended arms together in front of your torso.",
    maxLevel: 6,
    levels: {
      0: {
        level: "5 kg",
        points: 5,
      },
      1: {
        level: "10 kg",
        points: 10,
      },
      2: {
        level: "15 kg",
        points: 15,
      },
      3: {
        level: "20 kg",
        points: 20,
      },
      4: {
        level: "25 kg",
        points: 25,
      },
      5: {
        level: "30 kg",
        points: 30,
      },
    },
    category: 1,
    id: 8,
  },
  2: {
    title: "Dumbbell press",
    description: "In order to do a dumbell press lay down on a bench and press the dumbells up from your chest.",
    maxLevel: 6,
    levels: {
      0: {
        level: "10 kg",
        points: 5,
      },
      1: {
        level: "15 kg",
        points: 10,
      },
      2: {
        level: "20 kg",
        points: 15,
      },
      3: {
        level: "25 kg",
        points: 20,
      },
      4: {
        level: "30 kg",
        points: 25,
      },
      5: {
        level: "35 kg",
        points: 30,
      },
    },
    category: 1,
    id: 9,
  },
  3: {
    title: "Incline dumbbell press",
    description: "In order to do the incline dumbbell press you press the dumbbells up from the chest by extending the arms, while sitting at a 30 to 45 incline.",
    maxLevel: 6,
    levels: {
      0: {
        level: "10 kg",
        points: 5,
      },
      1: {
        level: "15 kg",
        points: 10,
      },
      2: {
        level: "20 kg",
        points: 15,
      },
      3: {
        level: "25 kg",
        points: 20,
      },
      4: {
        level: "30 kg",
        points: 25,
      },
      5: {
        level: "35 kg",
        points: 30,
      },
    },
    category: 1,
    id: 10,
  },
  4: {
    title: "Bench press",
    description: "In order to do a bench press, you press the barbell upwards while lying horizontally on the bench.",
    maxLevel: 6,
    levels: {
      0: {
        level: "20 kg",
        points: 5,
      },
      1: {
        level: "30 kg",
        points: 10,
      },
      2: {
        level: "40 kg",
        points: 15,
      },
      3: {
        level: "50 kg",
        points: 20,
      },
      4: {
        level: "60 kg",
        points: 25,
      },
      5: {
        level: "70 kg",
        points: 30,
      },
    },
    category: 1,
    id: 11,
  },
  5: {
    title: "Incline bench press",
    description: "In order to do the incline bench press you press the barbell up from the chest by extending the arms, while sitting at a 30 to 45 incline.",
    maxLevel: 6,
    levels: {
      0: {
        level: "20 kg",
        points: 5,
      },
      1: {
        level: "30 kg",
        points: 10,
      },
      2: {
        level: "40 kg",
        points: 15,
      },
      3: {
        level: "50 kg",
        points: 20,
      },
      4: {
        level: "60 kg",
        points: 25,
      },
      5: {
        level: "70 kg",
        points: 30,
      },
    },
    category: 1,
    id: 12,
  },
});

export const LegAchievements = Object.freeze({
  0: {
    title: "Squats",
    description: "To do a squat, stand with your at shoulder-width apart and your toes pointing ahead. Slowly descend, bending through the hips, knees and ankles. Stop when your knees reach a 90-degree angle.",
    maxLevel: 6,
    levels: {
      0: {
        level: "50 kg",
        points: 5,
      },
      1: {
        level: "60 kg",
        points: 10,
      },
      2: {
        level: "70 kg",
        points: 15,
      },
      3: {
        level: "80 kg",
        points: 20,
      },
      4: {
        level: "90 kg",
        points: 25,
      },
      5: {
        level: "100 kg",
        points: 30,
      },
    },
    category: 2,
    id: 13,
  },
  1: {
    title: "Deadlift",
    description: "In order to do a deadlift a loaded barbell is lifted off the floor to the level of the hips by keeping the arms and back extended.",
    maxLevel: 6,
    levels: {
      0: {
        level: "60 kg",
        points: 5,
      },
      1: {
        level: "80 kg",
        points: 10,
      },
      2: {
        level: "100 kg",
        points: 15,
      },
      3: {
        level: "120 kg",
        points: 20,
      },
      4: {
        level: "140 kg",
        points: 25,
      },
      5: {
        level: "160 kg",
        points: 30,
      },
    },
    category: 2,
    id: 14,
  },
  2: {
    title: "Lunges",
    description: "To perform a lunge stand in a split stance with the right foot in front of the left foot. Bend the knees and lower your body until the back knee is a few inches from the floor. Push back up to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "8 kg",
        points: 5,
      },
      1: {
        level: "12 kg",
        points: 10,
      },
      2: {
        level: "14 kg",
        points: 15,
      },
      3: {
        level: "16 kg",
        points: 20,
      },
      4: {
        level: "20 kg",
        points: 25,
      },
      5: {
        level: "24 kg",
        points: 30,
      },
    },
    category: 2,
    id: 15,
  },
  3: {
    title: "Hack squat",
    description: "In order to do a hack squat lean back onto the pads at an angle, with the weight placed on top of you by positioning yourself under the shoulder pads. Bend your knees, and push back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "50 kg",
        points: 5,
      },
      1: {
        level: "60 kg",
        points: 10,
      },
      2: {
        level: "70 kg",
        points: 15,
      },
      3: {
        level: "80 kg",
        points: 20,
      },
      4: {
        level: "90 kg",
        points: 25,
      },
      5: {
        level: "100 kg",
        points: 30,
      },
    },
    category: 2,
    id: 16,
  },
  4: {
    title: "Leg extension",
    description: "In order to do a leg extension sit on the machine with a weighted pad on top of your lower legs. Extend your knees to lift the weight, and then slowly lower the weight back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "50 kg",
        points: 5,
      },
      1: {
        level: "60 kg",
        points: 10,
      },
      2: {
        level: "70 kg",
        points: 15,
      },
      3: {
        level: "80 kg",
        points: 20,
      },
      4: {
        level: "90 kg",
        points: 25,
      },
      5: {
        level: "100 kg",
        points: 30,
      },
    },
    category: 2,
    id: 17,
  },
  5: {
    title: "Calf raises",
    description: "To do calf raises stand with your feet hip-width apart, and your toes pointing forward. Raise your heels off the floor and squeeze your calves. Slowly move back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "8 kg",
        points: 5,
      },
      1: {
        level: "16 kg",
        points: 10,
      },
      2: {
        level: "24 kg",
        points: 15,
      },
      3: {
        level: "32 kg",
        points: 20,
      },
      4: {
        level: "40 kg",
        points: 25,
      },
      5: {
        level: "44 kg",
        points: 30,
      },
    },
    category: 2,
    id: 18,
  },
});

export const BackAchievements = Object.freeze({
  0: {
    title: "Barbell row",
    description: "In order to do the barbell row lift the barbell from the ground with your chest slightly bent over. Then lift and lower the barbell.",
    maxLevel: 6,
    levels: {
      0: {
        level: "20 kg",
        points: 5,
      },
      1: {
        level: "30 kg",
        points: 10,
      },
      2: {
        level: "40 kg",
        points: 15,
      },
      3: {
        level: "50 kg",
        points: 20,
      },
      4: {
        level: "60 kg",
        points: 25,
      },
      5: {
        level: "70 kg",
        points: 30,
      },
    },
    category: 3,
    id: 19,
  },
  1: {
    title: "Dumbbell row",
    description: "In order to do the dumbell row place one knee and hand on a bench, and lift the dumbell up with the other hand. Slowlly lower the dumbell back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "12 kg",
        points: 5,
      },
      1: {
        level: "16 kg",
        points: 10,
      },
      2: {
        level: "20 kg",
        points: 15,
      },
      3: {
        level: "24 kg",
        points: 20,
      },
      4: {
        level: "28 kg",
        points: 25,
      },
      5: {
        level: "32 kg",
        points: 30,
      },
    },
    category: 3,
    id: 20,
  },
  2: {
    title: "Lat pulldown",
    description: "In order to do the lat pulldown pull the hanging bar towards you to reach chin level, then slowly release it back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "30 kg",
        points: 5,
      },
      1: {
        level: "40 kg",
        points: 10,
      },
      2: {
        level: "50 kg",
        points: 15,
      },
      3: {
        level: "60 kg",
        points: 20,
      },
      4: {
        level: "70 kg",
        points: 25,
      },
      5: {
        level: "80 kg",
        points: 30,
      },
    },
    category: 3,
    id: 21,
  },
  3: {
    title: "Low row cable",
    description: "In order to do the low row cable pull the cable towards you while sitting on the bench, then slowly release it back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "30 kg",
        points: 5,
      },
      1: {
        level: "40 kg",
        points: 10,
      },
      2: {
        level: "50 kg",
        points: 15,
      },
      3: {
        level: "60 kg",
        points: 20,
      },
      4: {
        level: "70 kg",
        points: 25,
      },
      5: {
        level: "80 kg",
        points: 30,
      },
    },
    category: 3,
    id: 22,
  },
  4: {
    title: "Face pulls",
    description: "In order to do face pulls pull the rope towards your face while standing, then slowly release it back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "12 kg",
        points: 5,
      },
      1: {
        level: "16 kg",
        points: 10,
      },
      2: {
        level: "20 kg",
        points: 15,
      },
      3: {
        level: "24 kg",
        points: 20,
      },
      4: {
        level: "28 kg",
        points: 25,
      },
      5: {
        level: "32 kg",
        points: 30,
      },
    },
    category: 3,
    id: 23,
  },
  5: {
    title: "Reverse cable flies",
    description: "To perform reverse cable flies stand with your feet shoulder-width apart and your knees slightly bent. Hold the cable handles with your palms facing each other. Pull the handles out to the sides, keeping your arms straight. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "12 kg",
        points: 5,
      },
      1: {
        level: "16 kg",
        points: 10,
      },
      2: {
        level: "20 kg",
        points: 15,
      },
      3: {
        level: "24 kg",
        points: 20,
      },
      4: {
        level: "28 kg",
        points: 25,
      },
      5: {
        level: "32 kg",
        points: 30,
      },
    },
    category: 3,
    id: 24,
  },
});

export const ShoulderAchievements = Object.freeze({
  0: {
    title: "Seated shoulder press",
    description: "To perform the seated shoulder press sit on a bench with a back support and hold the barbell at shoulder height. Press the barbell up until your arms are fully extended. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "14 kg",
        points: 5,
      },
      1: {
        level: "18 kg",
        points: 10,
      },
      2: {
        level: "22 kg",
        points: 15,
      },
      3: {
        level: "26 kg",
        points: 20,
      },
      4: {
        level: "30 kg",
        points: 25,
      },
      5: {
        level: "34 kg",
        points: 30,
      },
    },
    category: 4,
    id: 25,
  },
  1: {
    title: "Overhead press",
    description: "To perform an overhead press stand with the bar on your front shoulders. Press the bar in a vertical line above your head until your arms are fully extended. Return slowly to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "20 kg",
        points: 5,
      },
      1: {
        level: "30 kg",
        points: 10,
      },
      2: {
        level: "40 kg",
        points: 15,
      },
      3: {
        level: "50 kg",
        points: 20,
      },
      4: {
        level: "60 kg",
        points: 25,
      },
      5: {
        level: "70 kg",
        points: 30,
      },
    },
    category: 4,
    id: 26,
  },
  2: {
    title: "Lateral raises",
    description: "In order to do lateral raises stand with your feet shoulder-width apart and your knees slightly bent. Hold the dumbbells at your sides with your palms facing your body. Raise the dumbbells out to the sides until your arms are parallel to the floor. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "9 kg",
        points: 10,
      },
      2: {
        level: "12 kg",
        points: 15,
      },
      3: {
        level: "15 kg",
        points: 20,
      },
      4: {
        level: "18 kg",
        points: 25,
      },
      5: {
        level: "21 kg",
        points: 30,
      },
    },
    category: 4,
    id: 27,
  },
  3: {
    title: "Front raises",
    description: "In order to do front raises stand with your feet shoulder-width apart and your knees slightly bent. Hold the dumbbells at your sides with your palms facing your body. Raise the dumbbells out to the front until your arms are parallel to the floor. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "9 kg",
        points: 10,
      },
      2: {
        level: "12 kg",
        points: 15,
      },
      3: {
        level: "15 kg",
        points: 20,
      },
      4: {
        level: "18 kg",
        points: 25,
      },
      5: {
        level: "21 kg",
        points: 30,
      },
    },
    category: 4,
    id: 28,
  },
  4: {
    title: "Shoulder shrugs",
    description: "In order to do shoulder shrugs raise your shoulders, aiming to bring the cap of your shoulder up towards your ear. Slowly lower your shoulders back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "10 kg",
        points: 10,
      },
      2: {
        level: "14 kg",
        points: 15,
      },
      3: {
        level: "18 kg",
        points: 20,
      },
      4: {
        level: "22 kg",
        points: 25,
      },
      5: {
        level: "26 kg",
        points: 30,
      },
    },
    category: 4,
    id: 29,
  },
  5: {
    title: "High pulls",
    description: "To perform a high pull setup with your feet in a shoulder width stance, toes pointed out slightly, and your hands in a slightly wider than shoulder width grip. Then dip slightly to the power position and allow the bar to slide down your thighs. Explosively jump straight up, shrug the bar aggressively, and then drive the elbows high.",
    maxLevel: 5,
    levels: {
      0: {
        level: "20 kg",
        points: 5,
      },
      1: {
        level: "30 kg",
        points: 10,
      },
      2: {
        level: "40 kg",
        points: 15,
      },
      3: {
        level: "50 kg",
        points: 20,
      },
      4: {
        level: "60 kg",
        points: 25,
      },
      5: {
        level: "70 kg",
        points: 30,
      },
    },
    category: 4,
    id: 30,
  },
});

export const BicepAchievements = Object.freeze({
  0: {
    title: "Bicep curl",
    description: "To perform a biceps curl with a dumbbell, hold a dumbbell with your palm facing upward. Slowly curl the weight up by bending your elbow, keeping your elbow close to your body. Then slowly lower the weight to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "8 kg",
        points: 10,
      },
      2: {
        level: "10 kg",
        points: 15,
      },
      3: {
        level: "12 kg",
        points: 20,
      },
      4: {
        level: "14 kg",
        points: 25,
      },
      5: {
        level: "16 kg",
        points: 30,
      },
    },
    category: 5,
    id: 31,
  },
  1: {
    title: "Hammer curl",
    description: "In order to do a hammer curl, hold a dumbbell in each hand with your palms facing your body. Keep your elbows close to your body and curl the weights up to your shoulders. Slowly lower the weights back to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "8 kg",
        points: 10,
      },
      2: {
        level: "10 kg",
        points: 15,
      },
      3: {
        level: "12 kg",
        points: 20,
      },
      4: {
        level: "14 kg",
        points: 25,
      },
      5: {
        level: "16 kg",
        points: 30,
      },
    },
    category: 5,
    id: 32,
  },
  2: {
    title: "Preacher curl",
    description: "To perform a preacher curl grab the barbell or EZ curl bar with an underhand grip, and sit down on the preacher curl bench with your feet flat on the floor. While keeping your upper arms in contact with the arm pad, initiate the upward movement by squeezing your biceps and bending your elbows",
    maxLevel: 6,
    levels: {
      0: {
        level: "6 kg",
        points: 5,
      },
      1: {
        level: "8 kg",
        points: 10,
      },
      2: {
        level: "10 kg",
        points: 15,
      },
      3: {
        level: "12 kg",
        points: 20,
      },
      4: {
        level: "14 kg",
        points: 25,
      },
      5: {
        level: "16 kg",
        points: 30,
      },
    },
    category: 5,
    id: 33,
  },
});

export const TricepAchievements = Object.freeze({
  0: {
    title: "Skull crushers",
    description: "To perform skull crushers lie on your back as you bring the weight up to a position over your collarbone. Keeping your shoulders stable, slowly bend your elbows, bringing the weight down to just past your head. Keep your elbows pointing straight ahead as you lower the weight. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "8 kg",
        points: 5,
      },
      1: {
        level: "12 kg",
        points: 10,
      },
      2: {
        level: "14 kg",
        points: 15,
      },
      3: {
        level: "16 kg",
        points: 20,
      },
      4: {
        level: "20 kg",
        points: 25,
      },
      5: {
        level: "24 kg",
        points: 30,
      },
    },
    category: 6,
    id: 34,
  },
  1: {
    title: "Overhead tricep extension",
    description: "To perform the overhead tricep extension start by standing in front of the cable machine, facing away from it. Extend your forearms overhead, until your arms are fully extended but not locked out at the elbows. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "10 kg",
        points: 5,
      },
      1: {
        level: "16 kg",
        points: 10,
      },
      2: {
        level: "22 kg",
        points: 15,
      },
      3: {
        level: "28 kg",
        points: 20,
      },
      4: {
        level: "32 kg",
        points: 25,
      },
      5: {
        level: "38 kg",
        points: 30,
      },
    },
    category: 6,
    id: 35,
  },
  2: {
    title: "Tricep pushdown",
    description: "In order to do a tricep pushdown face the tricep pushdown cable machine and grasp the horizontal cable bar or rope attachment. Tuck your elbows at your sides and position your feet slightly apart. Push down until your elbows are fully extended but not yet in the straight, locked position. Slowly return to the starting position.",
    maxLevel: 6,
    levels: {
      0: {
        level: "14 kg",
        points: 5,
      },
      1: {
        level: "20 kg",
        points: 10,
      },
      2: {
        level: "26 kg",
        points: 15,
      },
      3: {
        level: "32 kg",
        points: 20,
      },
      4: {
        level: "38 kg",
        points: 25,
      },
      5: {
        level: "44 kg",
        points: 30,
      },
    },
    category: 6,
    id: 36,
  },
});

export type Achievements = { [key: number]: SingleAchievement };

export const AllAchievements = [
  MonthlyAchievements as Achievements,
  ChestAchievements as Achievements,
  LegAchievements as Achievements,
  BackAchievements as Achievements,
  ShoulderAchievements as Achievements,
  BicepAchievements as Achievements,
  TricepAchievements as Achievements,
];
