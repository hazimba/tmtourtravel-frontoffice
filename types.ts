enum EntryMode {
  FIT = "FIT",
  GIT = "GIT",
}

enum PackageSession {
  PEAK = "PEAK",
  OFFPEAK = "OFFPEAK",
  ALLSEASON = "ALLSEASON",
  SPRING = "SPRING",
  AUTUMN = "AUTUMN",
  SUMMER = "SUMMER",
  WINTER = "WINTER",
}

enum Apprearance {
  NORMAL = "NORMAL",
  HIGHLIGHT = "HIGHLIGHT",
  PROMOTION = "PROMOTION",
}

enum PackageType {
  GROUP = "GROUP",
  GROUND = "GROUND",
  UMRAH = "UMRAH",
  MICE = "MICE",
}

enum MealPlan {
  FULLBOARD = "FULLBOARD",
  HALFBOARD = "HALFBOARD",
  BREAKFASTONLY = "BREAKFASTONLY",
  NOMEAL = "NOMEAL",
}

export interface Package {
  uuid: string;
  title: string;
  subtitle: string;
  route: string;
  keywords: string;
  highlight: string;
  itinerary: string[];
  optionalTours: string;
  flightSchedule: string;
  freebies: string;
  includes: string;
  excludes: string;
  importantNotes: string;
  conditions: string;
  embedded: string;
  webPriority: number;
  webTier: number;
  salePeriod: Date;
  updatePeriod: Date;
  saleAbleMarket: string;
  isPublish: boolean;
  entryMode: EntryMode;
  session: PackageSession;
  country: string;
  appearance: Apprearance;
  type: PackageType;
  mealPlan: MealPlan;
  location: string;
  tourCode: string;
  features: string[];
  mainImageUrl: string;
  subImageUrls: string[];
  main_image_url: string;
}
