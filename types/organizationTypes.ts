export interface Organization {
  id: string;
  name: string;
  description: string;
  founder: string;
}

export interface OrganizationPageProps {
  organization: Organization | null;
}