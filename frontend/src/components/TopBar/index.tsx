import { Settings, User } from "lucide-react"; // Íconos de configuración y usuario
import logo from "../../assets/logo.png"; // Importa la imagen

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="left-section">
      <img src={logo} alt="Logo" className="logo" />
      <nav className="menu">
          <span>File</span>
          <span>Edit</span>
          <span>View</span>
          <span>Help</span>
          {/* <span className="pro-version">Versión Pro</span> */}
        </nav>
      </div>

      <div className="center-section">Project Name</div>

      <div className="right-section">
        <Settings className="icon" />
        <User className="icon" />
      </div>
    </div>
  );
}
