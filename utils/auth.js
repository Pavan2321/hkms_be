const jwt = require('jsonwebtoken')
const moment = require("moment");

const AuthUtil = {
    authenticate: async (req, res, next) => {
        let token = req.headers.authorization ?? req.headers.Authorization;
        if (!token) {
            return res.status(403).json({ msg: "UNAUTHORIZED" });
        } else {
            const user = validateToken(token);
            if (!user) {
                return res.status(403).json({ msg: "TOKEN_EXPIRED" });
            }
            next();
        }
    }
}

function validateToken(token) {
    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        const user = decoded;
        if (
            user.role === "admin"
                ? checkTSForClientKeyBasedAuth(user.iat)
                : checkTS(user.iat)
        ) {
            return user;
        } else {
            return false;
        }
    } catch (ex) {
        return false;
    }
}
// token will expire after 7 days
function checkTS(iat) {
    const momIAT = moment(iat * 1000);
    const ts = moment(new Date().getTime());
    if (ts.diff(momIAT, "day") > 7) {
        return false;
    } else {
        return true;
    }
}

function checkTSForClientKeyBasedAuth(iat) {
    const momIAT = moment(iat * 1000);
    const ts = moment(new Date().getTime());
    if (ts.diff(momIAT, "minutes") > 30) {
      return false;
    } else {
      return true;
    }
  }

module.exports = {
    AuthUtil
  };