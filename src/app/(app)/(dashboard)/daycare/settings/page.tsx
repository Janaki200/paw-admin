import { Settings } from 'lucide-react';

export default function DaycareSettingsPage() {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <Settings className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Daycare Settings
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage your daycare profile, services, capacity, and operating hours here.
        </p>
        {/* Placeholder for settings form */}
      </div>
    </div>
  );
}
