import {
  Authenticated,
  GitHubBanner,
  Refine,
  ResourceProps,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
// import {
//   BlogPostCreate,
//   BlogPostEdit,
//   BlogPostList,
//   BlogPostShow,
// } from "./pages/blog-posts";
// import {
//   CategoryCreate,
//   CategoryEdit,
//   CategoryList,
//   CategoryShow,
// } from "./pages/categories";
import { ForgotPassword } from "./pages/forgotPassword";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ReactElement } from "react";

// routes import
import { UserList, UserCreate, UserEdit, UserShow } from "./pages/users";
import {
  RestaurantList,
  RestaurantCreate,
  RestaurantEdit,
  RestaurantShow,
} from "./pages/restaurants";
import { MealList, MealCreate, MealEdit, MealShow } from "./pages/meals";
import {
  SubscriptionList,
  SubscriptionCreate,
  SubscriptionEdit,
  SubscriptionShow,
} from "./pages/subscriptions";
import { OrderList, OrderCreate, OrderEdit, OrderShow } from "./pages/orders";

type resourceRoute = {
  createRoute: ReactElement;
  editRoute: ReactElement;
  listRoute: ReactElement;
  showRoute: ReactElement;
};
interface MyResource {
  resource: string;
  icon?: ReactElement;
  routes: resourceRoute;
}

const myRoutes: MyResource[] = [
  {
    resource: "users",
    icon: <i className="bx  bx-user"></i>,
    routes: {
      createRoute: <UserCreate />,
      editRoute: <UserEdit />,
      listRoute: <UserList />,
      showRoute: <UserShow />,
    },
  },
  {
    resource: "restaurants",
    icon: <i className="bx bx-store"></i>,
    routes: {
      createRoute: <RestaurantCreate />,
      editRoute: <RestaurantEdit />,
      listRoute: <RestaurantList />,
      showRoute: <RestaurantShow />,
    },
  },
  {
    resource: "meals",
    icon: <i className="bx bx-food-menu"></i>,
    routes: {
      createRoute: <MealCreate />,
      editRoute: <MealEdit />,
      listRoute: <MealList />,
      showRoute: <MealShow />,
    },
  },
  {
    resource: "subscriptions",
    icon: <i className="bx bx-wallet"></i>,
    routes: {
      createRoute: <SubscriptionCreate />,
      editRoute: <SubscriptionEdit />,
      listRoute: <SubscriptionList />,
      showRoute: <SubscriptionShow />,
    },
  },
  {
    resource: "orders",
    icon: <i className="bx bx-cart"></i>,
    routes: {
      createRoute: <OrderCreate />,
      editRoute: <OrderEdit />,
      listRoute: <OrderList />,
      showRoute: <OrderShow />,
    },
  },
];

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  ...myRoutes.map(
                    (resource: MyResource) =>
                      ({
                        name: resource.resource,
                        list: `/${resource.resource}`,
                        create: `/${resource.resource}/create`,
                        edit: `/${resource.resource}/edit/:id`,
                        show: `/${resource.resource}/show/:id`,
                        meta: {
                          canDelete: true,
                          icon: resource.icon && resource.icon,
                        },
                      } as ResourceProps)
                  ),
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "23b34f-R3vwuw-jMHebc",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={
                        <NavigateToResource resource={myRoutes[0].resource} />
                      }
                    />
                    {/* <Route path="/blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>
                    <Route path="/categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route> */}
                    {/* Use Case Routes */}
                    {myRoutes.map((resource: MyResource) => (
                      <Route
                        key={resource.resource}
                        path={`/${resource.resource}`}
                      >
                        <Route index element={resource.routes.listRoute} />
                        <Route
                          path="create"
                          element={resource.routes.createRoute}
                        />
                        <Route
                          path="edit/:id"
                          element={resource.routes.editRoute}
                        />
                        <Route
                          path="show/:id"
                          element={resource.routes.showRoute}
                        />
                      </Route>
                    ))}
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
