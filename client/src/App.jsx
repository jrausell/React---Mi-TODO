import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	defer
} from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { TodoLayout } from "./layouts/TodoLayout";
import { TodoPage } from "./pages/TodoPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";

import { LoginLayout } from "./layouts/LoginLayout";
import { LoginPage } from "./pages/LoginPage";

// ideally this would be an API call to server to get logged in user data

const getUserData = () =>
	new Promise((resolve) => {
		const user = window.localStorage.getItem("user");
		resolve(user);
	});

// for error
// const getUserData = () =>
//   new Promise((resolve, reject) =>
//     setTimeout(() => {
//       reject("Error");
//     }, 3000)
//   );

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			element={<AuthLayout />}
			loader={() => defer({ userPromise: getUserData() })}
		>
			<Route element={<LoginLayout />}>
				<Route path="/" element={<LoginPage />} />
				<Route path="/login" element={<LoginPage />} />
			</Route>

			<Route path="/in" element={<ProtectedLayout />}>
				<Route path="/in/" element={<TodoLayout />}>
					<Route path="todo" element={<TodoPage />} />
				</Route>
				<Route path="profile" element={<ProfilePage />} />
				<Route path="settings" element={<SettingsPage />} />
			</Route>
		</Route>
	)
);
