interface Feature {
  _id: string;
  guildId: string;
  name: string;
  description: string;
  icon: string;
  featureId: string;
  featureType?: string;
  featureData?: {};
  isEnabled: boolean;
}