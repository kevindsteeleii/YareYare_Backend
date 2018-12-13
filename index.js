const express = require('express'),
          app = express(),
       morgan = require('morgan'),
         cors = require('cors'),
         PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`Running on port ${PORT}...`)})
