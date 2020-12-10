const User = require('../models/auth.model');
const _ = require('lodash');
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
//Custom error handler to get useful error from database errors
const { response } = require('express');



const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
exports.googleController = (req, res) => {
  const {idToken, role} = req.body;
  //Verify token
  client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
    .then(response => { 
      const {email_verified, name, email } = response.payload;
      //Check if email verified
      if (email_verified) {
        User.findOne({ email }).exec((error, user) => {
          //Find if this email already exists
          if(user) {
            User.findByIdAndUpdate( {_id: user._id}, {$set: { isActive: true }}, {new: true},
              (error, data) => {
                jwt.sign({ _id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'}, (error, token) => {
                if (error) return res.status(400).json({error: error});
                const {_id, email, name, role, isActive, vehicles} = data;
                return res.json({token: token + "", user: { _id, email, name, role, isActive, vehicles }});
              });
            })
            
            
          } else {
            //If user not exists we will save in DB
            user = new User({ name, email, role, isActive: true });
            user.save((error, data) => {
              if (error) { 
                console.log('ERROR GOOGLE LOGIN ON USER SAVE', error);
                return res.status(400).json({ error: 'User signup failed with google'}) 
              };
              //If no error generate token
              jwt.sign({ _id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'}, (error, token) => {
                if (error) throw error;
                const { _id, email, name, role, isActive} = data;
                return res.json({
                  token: token,
                  user: { _id, email, name, role, isActive}
                })
              });
            })
          }
        })
      } else {
        //If Error
        return res.status(400).json({ error: "Google login failed. Try again." })
      }
     })
}

exports.facebookController = (req, res) => {

  const { userId, accessToken, role } = req.body;
  
  const url = `https://graph.facebook.com/v2.11/${userId}/?fields=id,name,email&access_token=${accessToken}`;
  // get from facebook
  fetch(url, {method: 'GET'}).then(response => response.json()).then(response => {
    const { email, name } = response;
    User.findOne({email}).exec((error, user) => {
      if (error) {
        return res.status(400).json({ error: 'Something went wrong...'})
      } else {
        if (user) {
          User.findByIdAndUpdate({_id: user._id}, {$set: { isActive: true }}, {new: true}, (error, data) => {
            jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'}, (error, token) => {
              if (error) throw error;
              const {_id, email, name, role, vehicles} = user;
              return res.json({token: token , user: { _id, email, name, role, vehicles }});
            });
          })
        } else {
          user = new User({ name, email, role, isActive: true });
          user.save((error, data) => {
            if (error) { 
              console.log('ERROR FACEBOOK LOGIN ON USER SAVE', error);
              return res.status(400).json({ error: 'User signup failed with facebook'}) 
            };
            
            //If no error generate token
            jwt.sign({ _id: data._id}, process.env.JWT_SECRET, {expiresIn: '7d'}, (error, token) => {
              if (error) throw error;
              console.log('Facebook login', token);
              const { _id, email, name, role, isActive} = data;
              return res.json({
                token: token,
                user: { _id, email, name, role, isActive}
              })
            });
          })
        }
      }
    })
  }).catch(error => { return res.status(400).json({error: 'Facebook login failed. Try later'}) })
}