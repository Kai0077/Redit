import { TabView, TabPanel } from "primereact/tabview";

export default function TabBar() {
    return (
        <div className="tabbar-wrap">
            <TabView className="tabbar">
                <TabPanel header="Posts">
                    <div className="tabbar-content">
                        {/* your posts content */}
                    </div>
                </TabPanel>
                <TabPanel header="Comments">
                    <div className="tabbar-content">
                        {/* your comments content */}
                    </div>
                </TabPanel>
                <TabPanel header="Communities">
                    <div className="tabbar-content">
                        {/* your communities content */}
                    </div>
                </TabPanel>
            </TabView>
        </div>
    );
}
