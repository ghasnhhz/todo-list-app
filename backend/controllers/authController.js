const jwt = require("jsonwebtoken")
const User = require("../models/User")
const RefreshToken = require("../models/RefreshToken")

async function register(req, res, next) {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({message: "username and password are required"})
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(409).json({message: "Username is already taken"})
    }

    const user = await User.create({ username, password })
    
    const accessToken = jwt.sign({ _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    await RefreshToken.create({
      token: refreshToken,
      userId: user._id
    })

    res.status(201).json({
      message: "User registered and logged in successfully",
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username,
      }
    })
  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const { username, password } = req.body
    
    if (!username || !password) {
      return res.status(400).json({message: "username and password are required"})
    }

    const user = await User.findOne({ username })
    
    if (!user) {
      return res.status(401).json({message: "Invalid credentials"})
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({message: "Invalid credentials"})
    }

    await RefreshToken.deleteMany({ userId: user._id })
    
    const accessToken = jwt.sign({ _id: user._id, username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    
    await RefreshToken.create({
      token: refreshToken,
      userId: user._id
    })

    res.status(200).json({
      message: "Successful login",
      token: accessToken,
      user: {
        _id: user._id,
        username: user.username
      }
    })
  } catch (err) {
    next(err)
  }
}

async function logout(req, res, next) {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return res.send(refreshToken)
    }
    
    if (refreshToken) {
      await RefreshToken.deleteOne({token: refreshToken})
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({message: "Logged out successfully"})
  } catch (err) {
    next(err)
  }
}

module.exports = {register, login, logout}