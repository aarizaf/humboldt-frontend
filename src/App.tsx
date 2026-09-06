import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleRoute from './routes/RoleRoute';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardIndex from './pages/dashboard/DashboardIndex';
import MisMaterias from './pages/dashboard/estudiante/MisMaterias';
import MateriaDetalle from './pages/dashboard/estudiante/MateriaDetalle';
import ComingSoon from './components/ComingSoon';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardIndex />} />

              <Route element={<RoleRoute allow={['estudiante']} />}>
                <Route path="materias" element={<MisMaterias />} />
                <Route path="materias/:materiaId" element={<MateriaDetalle />} />
              </Route>

              <Route element={<RoleRoute allow={['profesor']} />}>
                <Route
                  path="actividades"
                  element={
                    <ComingSoon
                      titulo="Gestión de actividades"
                      descripcion="Aquí podrás asignar y calificar las actividades de las materias que impartes. Esta función está en construcción."
                    />
                  }
                />
                <Route
                  path="asistencia"
                  element={
                    <ComingSoon
                      titulo="Asistencia"
                      descripcion="Aquí podrás pasar asistencia de tus clases por curso. Esta función está en construcción."
                    />
                  }
                />
              </Route>

              <Route element={<RoleRoute allow={['admin']} />}>
                <Route
                  path="horarios"
                  element={
                    <ComingSoon
                      titulo="Horarios"
                      descripcion="Aquí podrás asignar materias y profesores a cursos específicos. Esta función está en construcción."
                    />
                  }
                />
                <Route
                  path="reportes"
                  element={
                    <ComingSoon
                      titulo="Reportes"
                      descripcion="Aquí podrás ver y generar reportes de desempeño por materia, curso o estudiante. Esta función está en construcción."
                    />
                  }
                />
                <Route
                  path="asignaciones"
                  element={
                    <ComingSoon
                      titulo="Asignaciones"
                      descripcion="Aquí podrás asignar estudiantes a los cursos. Esta función está en construcción."
                    />
                  }
                />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
