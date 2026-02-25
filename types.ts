export enum EntryMode {
  FIT = "FIT",
  GIT = "GIT",
}

export enum Tags {
  HOT = "HOT",
  POPULAR = "POPULAR",
  NEW = "NEW",
  RECOMMENDED = "RECOMMENDED",
}

export enum PackageSession {
  PEAK = "PEAK",
  OFFPEAK = "OFFPEAK",
  ALLSEASON = "ALLSEASON",
  SPRING = "SPRING",
  AUTUMN = "AUTUMN",
  SUMMER = "SUMMER",
  WINTER = "WINTER",
}

export enum Appearance {
  NORMAL = "NORMAL",
  HIGHLIGHT = "HIGHLIGHT",
  PROMOTION = "PROMOTION",
}

export enum PackageType {
  GROUP = "GROUP",
  GROUND = "GROUND",
  UMRAH = "UMRAH",
  MICE = "MICE",
}

export enum MealPlan {
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
  optional_tours: string;
  flight_schedule: {
    range: {
      from: Date;
      to?: Date;
    };
  }[];
  freebies: string;
  includes: string;
  excludes: string;
  important_notes: string;
  conditions: string;
  embedded: string;
  web_priority: number;
  web_tier: number;
  sale_period: {
    from: Date;
    to?: Date;
  };
  update_period: Date;
  sale_able_market: string;
  is_publish: boolean;
  entry_mode: EntryMode;
  session: PackageSession;
  country: string;
  appearance: Appearance;
  type: PackageType;
  meal_plan: MealPlan;
  location: string;
  tour_code: string;
  features: string[];
  main_image_url: string;
  sub_image_urls: string[];
  tags: string[];
}

export interface ImageSlider {
  id: string;
  title: string;
  subtitle: string;
  buttontext: string;
  buttonpath: string;
  imageurl: string;
  isActive: boolean;
  // future will do join
  // package_uuid: string | null;
  // packages: Package[];
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
  created_at: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  is_publish: boolean;
  created_at: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  quote: string;
  is_publish: boolean;
  image_url: string | null;
  created_at: Date;
}

export interface SiteSetting {
  id: string;
  show_slider: boolean;
  show_packages: boolean;
  show_partners: boolean;
  show_contact: boolean;
  show_testimonials: boolean;
  created_at: Date;
}

export interface Enquiries {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  message: string;
  created_at: string;
}
