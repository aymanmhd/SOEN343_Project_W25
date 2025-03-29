class SignUpFormBuilder {
    constructor() {
      this.formElements = [];
    }
  
    addInput(type, placeholder, iconClass, state, setState) {
      this.formElements.push(
        <div className="signup-input-wrapper" key={placeholder}>
          <i className={`fas ${iconClass} input-icon`}></i>
          <input
            type={type}
            placeholder={placeholder}
            className="signup-input"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
      );
      return this;
    }
  
    addPasswordInput(password, setPassword, showPassword, togglePassword) {
      this.formElements.push(
        <div className="signup-input-wrapper" key="password">
          <i className="fas fa-lock input-icon"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="signup-eye-icon" onClick={togglePassword}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>
      );
      return this;
    }
    
  
    addSocialIcons() {
      this.formElements.push(
        <div className="signup-social-icons" key="social-icons">
          {["facebook-f", "google", "linkedin-in"].map((platform) => (
            <a
              key={platform}
              href={`https://www.${platform.split("-")[0]}.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-circle"
            >
              <i className={`fab fa-${platform}`}></i>
            </a>
          ))}
        </div>
      );
      return this;
    }
  
    build() {
      return this.formElements;
    }
  }
  
  export default SignUpFormBuilder;
  