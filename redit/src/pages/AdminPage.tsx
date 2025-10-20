import {TabView, TabPanel} from "primereact/tabview";
import {useState} from "react";
import PostList from "../components/posts/AdminPostList";
import AppToast from "../components/AppToast";
import "../../styles/AdminPage.css";
import Menubar from "../layouts/Menubar.tsx";

export default function AdminPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div>
            <Menubar/>
            <div className="admin-page">
                <AppToast/>
                <h1 className="admin-title">Admin Dashboard</h1>

                <div className="admin-tabs">
                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={(e) => setActiveIndex(e.index)}
                        className="custom-tabview"
                    >
                        {/* Posts Tab */}
                        <TabPanel header="Posts">
                            <PostList/>
                        </TabPanel>

                        {/* Communities Tab */}
                        <TabPanel header="Communities">
                            <div className="tab-placeholder">
                                <p>Community management coming soon.</p>
                            </div>
                        </TabPanel>

                        {/* Users Tab */}
                        <TabPanel header="Users">
                            <div className="tab-placeholder">
                                <p>User management coming soon.</p>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
}