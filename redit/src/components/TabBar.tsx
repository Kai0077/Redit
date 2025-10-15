import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function TabBar() {
    const navigate = useNavigate();
    return (
        <div className="tabbar-wrap">
            <TabView className="tabbar">
                <TabPanel header="Posts">
                    <div className="tabbar-toolbar">
                        <Button
                            label="Create Post"
                            icon="pi pi-plus"
                            rounded
                            className="tabbar-create-post"
                            onClick={() => navigate("/post")}
                        />
                    </div>

                    {/* content box */}
                    <div className="tabbar-content">
                        {/* your content here */}
                    </div>
                </TabPanel>

                <TabPanel header="Comments">
                    <div className="tabbar-content">{/* your comments content */}</div>
                </TabPanel>

                <TabPanel header="Communities">
                    <div className="tabbar-content">{/* your communities content */}</div>
                </TabPanel>
            </TabView>
        </div>
    );
}
