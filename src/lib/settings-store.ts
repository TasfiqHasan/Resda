export interface PlatformSettings {
  siteName: string;
  supportEmail: string;
  campusAddress: string;
  hotline: string;
  maintenanceMode: boolean;
  autoApproveEnrollments: boolean;
  currency: string;
  updatedAt: string;
}

const globalSettings = global as unknown as {
  _resdaSettings?: PlatformSettings;
};

if (!globalSettings._resdaSettings) {
  globalSettings._resdaSettings = {
    siteName: "RESDA - Skill Empowerment for the Nation's Future",
    supportEmail: "info@resda.org",
    campusAddress: "19th Floor, Nafi Tower, 53 Gulshan Avenue, Gulshan-1, Dhaka 1212, Bangladesh",
    hotline: "+880 1700-000000",
    maintenanceMode: false,
    autoApproveEnrollments: true,
    currency: "BDT (৳)",
    updatedAt: new Date().toISOString(),
  };
}

export function getPlatformSettings(): PlatformSettings {
  return { ...globalSettings._resdaSettings! };
}

export function updatePlatformSettings(data: Partial<PlatformSettings>): PlatformSettings {
  const current = globalSettings._resdaSettings!;
  globalSettings._resdaSettings = {
    ...current,
    ...data,
    updatedAt: new Date().toISOString(),
  };
  return { ...globalSettings._resdaSettings };
}
