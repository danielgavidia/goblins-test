import { SidebarProvider } from "@/components/ui/sidebar";
import GeneralSidebar from "../x-components/general.sidebar";

const GeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="h-full w-full flex">
        <GeneralSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default GeneralLayout;
