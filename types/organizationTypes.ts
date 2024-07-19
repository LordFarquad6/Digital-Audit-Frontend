export interface Organization {
  id: string;
  name: string;
  description: string;
}

export interface OrganizationPageProps {
  organization: Organization | null;
}