
[![Build Status](https://travis-ci.org/fac-15/FAC-YAK.svg?branch=staging)](https://travis-ci.org/fac-15/FAC-YAK)

[![codecov](https://codecov.io/gh/fac-15/FAC-YAK/branch/staging/graph/badge.svg)](https://codecov.io/gh/fac-15/FAC-YAK)


# Fac Yak

A thing where you can add and view lightning talks at Founders and Coders. Sign up and log in to add a talk, and view all talks on the main splash page. Team members are:

- [Susan](https://github.com/susanX)
- [Alex](https://github.com/aterna01)
- [Oliver](https://github.com/Oliversw)
- [Martin](https://github.com/mr-bagglesworth)

![yak](https://i.imgur.com/OGfSmfb.jpg)


## To get it running locally:
1. clone repo
2. `npm install`
3. run database build scripts:
    `node database/bd_build.js` - main database, hosted on heroku. **NOTE** this will overwrite current database
    `node database/bd_build_test.js` - testing database
4. `npm run dev` 
5. Create a config.env file and ask us for the contents!
6. view project on [port 8000](http://localhost:8000/)
7. `npm run coverage`for code coverage

### Dev Dependencies:
- nodemon
- tape
- tap-spec
- codecov
- nyc / istanbul
- supertest

### Dependencies:
- bcryptjs
- cookie
- jsonwebtoken
- and more...


---
### Checklist:

- [x] User stories as issues on Github
- [x] Travis CI setup
- [ ] Testing:
    - [x] Tape and Tap Spec setup
    - [x] Supertest for routing
    - [x] codecov
    - [x] badges (show in README.md), but not passing
    - [ ] database testing

- [ ] Front end:
    - [x] HTML: index, signuplogin, dashboard
    - [x] CSS: reset, styles
    - [ ] JS: request, main.
    - [x] Cookies (for login/ authentication). We have a login with jwt!

- [ ] Database:
    - [ ] Test database (local to each machine)
    - [x] Live database (hosted on heroku)
    - [ ] Conditionals in files to accommodate for local/ live

[More in HackMD](https://hackmd.io/Xv98HyOrTCWqt5ALRbhR0w?both)

---

### Whiteboarding and User Stories

**Original Whiteboard**
![](https://i.imgur.com/ohj8ium.jpg)

**User adds a post when logged in**
![](https://i.imgur.com/Op9zxxx.jpg)

---

### Difficulties
- Redirecting after submitting new user
    - problem with postData function in handler.js
- Getting bcrypt to actually match passwords
- Adding and getting environment variables to work in Travis (It worked when the config file was in Github)


### What we are proud of
- Promise on db_build.js
- The YAK!!!
- Not calling it FAK Chat


