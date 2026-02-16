const jwt = require("jsonwebtoken")
const RefreshToken = require("../models/RefreshToken")
const User = require("../models/User")

async function refreshToken(req, res, next) {
  try {
    const oldRefreshToken = req.cookies.refreshToken

    if (!oldRefreshToken) {
      return res.status(400).json({message: "No refresh token provided"})
    }

    const tokenInDB = await RefreshToken.findOne({ token: oldRefreshToken })
    
    if (!tokenInDB) return res.status(403).json({ message: "Invalid or expired refresh token"})

    jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, encoded) => {
      if (err) return res.status(403).json({ message: "Invalid token" })
      
      const user = await User.findById(encoded._id)

      if (!user) return res.status(403).json({message: "User not found"})

      await RefreshToken.deleteOne({token: oldRefreshToken})
      
      const accessToken = jwt.sign({ _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
      const newRefreshToken = jwt.sign({_id: user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      await RefreshToken.create({ userId: user._id, token: newRefreshToken })
      
      res.status(200).json({
        message: "New accessToken is generated",
        token: accessToken,
        user: {
          _id: user._id,
          username: user.username
        }
      })
    })
  } catch (err) {
    next(err)
  }
}

module.exports = refreshToken