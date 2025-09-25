
export enum AgencyRole {
  ADMIN = "System Administrator",
  TRAFFIC_POLICE = "Traffic Police",
  POLICE_DEPT = "Police Department",
  AMBULANCE = "Ambulance Services",
  FIRE_DEPT = "Fire Department",
}

export interface RequestDetails {
  latitude: string;
  longitude: string;
  destination: string;
  priority: {
    label: string;
    description: string;
    value: string;
  };
  description: string;
}
