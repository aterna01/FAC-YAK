
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


NOTE: error in travis CI at pip install - see CoTechServices travis.yml
- also, is pip installed + listed in package.json, or conflicting with codecov
