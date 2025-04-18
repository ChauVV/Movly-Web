import { memo } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const MovlyLogo = ({
    setIsMenuOpen, scale = 1,
    showName = true, showIcon = true,
    isVertical = false,
    style = {},
}) => {
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

    const styleIcon = showName
        ? { height: '28px', marginRight: '4px', marginBottom: isVertical ? '0px' : '5px' }
        : { height: '28px', marginBottom: '5px' };

    return (
        <Link to="/" className="logo" onClick={handleNavigation('/')}
            style={{
                transform: `scale(${scale})`, justifyContent: 'center',
                flexDirection: isVertical ? 'column' : 'row',
                display: 'flex',
                alignItems: 'center',
                ...style
            }}
        >
            {showIcon && <img src="/logo192.png" alt="Movly Logo" style={styleIcon} className="header-logo" />}
            {showName && <span>Movly</span>}
        </Link>
    )
}

export default memo(MovlyLogo)