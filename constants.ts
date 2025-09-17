
import { AgencyRole } from './types';

// FIX: Add 'as const' to ensure labelKey is inferred as a literal type, not a generic string.
// This satisfies the type requirements of the translation function 't'.
export const AGENCY_ROLES = [
  { value: AgencyRole.ADMIN, labelKey: "agency_role_admin" },
  { value: AgencyRole.TRAFFIC_POLICE, labelKey: "agency_role_traffic_police" },
  { value: AgencyRole.POLICE_DEPT, labelKey: "agency_role_police_dept" },
  { value: AgencyRole.AMBULANCE, labelKey: "agency_role_ambulance" },
  { value: AgencyRole.FIRE_DEPT, labelKey: "agency_role_fire_dept" },
] as const;
