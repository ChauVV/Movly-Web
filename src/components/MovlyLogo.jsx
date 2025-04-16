import { memo } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const MovlyLogo = ({ setIsMenuOpen }) => {
    const navigate = useNavigate();

    const handleNavigation = (path, isExternal = false) => (e) => {
        e.preventDefault();
        setIsMenuOpen && setIsMenuOpen(false);

        if (isExternal) {
            window.open(path, '_blank', 'noopener,noreferrer');
        } else {
            navigate(path);
        }
    };

    return (
        <Link to="/" className="logo" onClick={handleNavigation('/')}>
            <span>Movly</span>
        </Link>
    )
}

export default memo(MovlyLogo)