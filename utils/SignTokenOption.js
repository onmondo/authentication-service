// throws an Error that will eventually handled by a middleware
class SignTokenOption {
  constructor(signOption) {
    const {issuer, expiresIn} = signOption;
    this.issuer = issuer;
    this.subject = process.env.JWT_SUBJECT;
    this.audience = process.env.JWT_AUDIENCE;
    this.expiresIn = expiresIn;
    this.algorithm = process.env.JWT_ALGO;
  }

  getSignOption() {
    return {
      issuer: this.issuer,
      subject: this.subject,
      audience: this.audience,
      expiresIn: this.expiresIn,
      algorithm: this.algorithm,
    }
  }
  getVerifyOption() {
    return {
      issuer: this.issuer,
      subject: this.subject,
      audience: this.audience,
      expiresIn: this.expiresIn,
      algorithms: [this.algorithm],
    }
  }  
}

module.exports = SignTokenOption;
