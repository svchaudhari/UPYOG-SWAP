import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./utils/AuthContext";
import { showAlert } from "./utils/Alerts";

const Backend = lazy(() => import("./backend"));
const ValidateUser = lazy(() => import("./utils/userAuth"));
const LandingPage = lazy(() => import("./landingPage"));
const UserLogout = lazy(() => import("./UserProfile"));
const EmployeeLogin = lazy(() => import("./employee/EmployeeLogin"));
const NewTradeRegistration = lazy(() => import("./backend/services/tradeLicense/registration"))
const TradeLicenseRenewal = lazy(() => import("./backend/services/tradeLicense/renewal"))
const TradeLicenseClosure = lazy(() => import("./backend/services/tradeLicense/closure"))
const ApplicationView = lazy(() => import("./backend/employee/applicationViews/index.js"))
const CitizenPayment = lazy(() => import("./backend/services/payments"))
const NewGarbageRegistration = lazy(() => import("./backend/services/garbageCollection/newGarbageRegistration/index.js"))
const GarbageDashboard = lazy(() => import("./backend/dashboard/garbageDashboard.js"));
const NewPetRegistration = lazy(() => import("./backend/services/pets/registration"));
const PetDashboard = lazy(() => import('./backend/dashboard/petDashboard.js'));
const NewSiteRegistration = lazy(() => import("./backend/services/advertisement/registration"));
const PrivateRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [showingAlert, setShowingAlert] = useState(false);
	const [redirect, setRedirect] = useState(false);

	useEffect(() => {
		if (!loading && !user && !showingAlert) {
			showAlert(
				"Unauthorized",
				"You must be logged in to access this page",
				"warning"
			);
			setShowingAlert(true);
			setRedirect(true);
		}
	}, [loading, user, showingAlert]);

	if (loading) return <p>Loading...</p>;
	if (redirect) return <Navigate to="/" />;
	return children;
};

function App() {
	return (
		<>
			<AuthProvider>
				<Router>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/validate-user" element={<ValidateUser />} />
							<Route path="/logout" element={<UserLogout />} />
							<Route path="/employee-login" element={<EmployeeLogin />} />

							<Route
								path="/backend"
								element={
									<PrivateRoute>
										<Backend />

									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/new-trade-registration"
								element={
									<PrivateRoute>
										<NewTradeRegistration />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/trade-license-renewal"
								element={
									<PrivateRoute>
										<TradeLicenseRenewal />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/trade-license-closure"
								element={
									<PrivateRoute>
										<TradeLicenseClosure />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/citizen-payments"
								element={
									<PrivateRoute>
										<CitizenPayment />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/employee/view-application"
								element={
									<PrivateRoute>
										<ApplicationView />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/new-garbage-registration"
								element={
									<PrivateRoute>
										<NewGarbageRegistration />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/garbage-dashboard"
								element={
									<PrivateRoute>
										<GarbageDashboard />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/new-pet-registration"
								element={
									<PrivateRoute>
										<NewPetRegistration />
									</PrivateRoute>
								}
							/>
							<Route
								path="/backend/pet-dashboard"
								element={
									<PrivateRoute>
										<PetDashboard />
									</PrivateRoute>
								}
							/>
							<Route
                                path="/backend/new-site-registration"
                                element={
                                    <PrivateRoute>
                                        <NewSiteRegistration />
                                    </PrivateRoute>
                                }
                            />
						</Routes>
					</Suspense>
				</Router>
			</AuthProvider>
		</>
	);
}

export default App;
