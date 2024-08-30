import express from 'express';
import authRoutes from './routes/auth.routes.js'
const app=express();


app.use('/api/auth',authRoutes)


app.listen(4000,()=>{
    console.log('server is running on port 4000')
})