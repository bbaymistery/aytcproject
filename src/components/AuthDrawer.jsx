import React, { useState, useEffect } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';
import './AuthDrawer.css';

const AuthDrawer = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowPassword(false);
  };

  return (
    <>
      <div className={`auth-backdrop ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`auth-drawer ${isOpen ? 'open' : ''}`}>
        <button className="auth-close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="auth-content">
          <h2 className="auth-title">{isLogin ? 'Daxil Ol' : 'Qeydiyyatdan Keçin'}</h2>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Email ünvanınızı daxil edin" required />
            </div>

            <div className="form-group">
              <label>Şifrə</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Şifrənizi daxil edin" 
                  required 
                />
                <button 
                  type="button" 
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="auth-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Şifrəni yadda saxla</span>
                </label>
                <a href="#" className="forgot-password">Şifrəmi unutdum</a>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Daxil olun' : 'Qeydiyyatdan keç'}
            </button>
          </form>

          <div className="auth-divider">
            <span>və ya</span>
          </div>

          <div className="social-logins">
            <button type="button" className="social-btn">
              <FcGoogle size={20} />
              Continue with Google
            </button>
            <button type="button" className="social-btn">
              <FaApple size={20} />
              Continue with Apple
            </button>
            <button type="button" className="social-btn">
              <FaFacebook size={20} color="#1877F2" />
              Continue with Facebook
            </button>
          </div>

          <div className="auth-switch">
            {isLogin ? (
              <p>Hesabınız yoxdur? <span onClick={toggleMode}>Qeydiyyatdan keçin</span></p>
            ) : (
              <p>Hesabınız var? <span onClick={toggleMode}>Daxil olun</span></p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthDrawer;
