const Koa = require('koa')
const Router = require('Koa-router')
const bodyParser = require('koa-bodyparser')
const mongo = require('koa-mongo')
const router = new Router();
const app = new Koa()
app.use(mongo({
    host: 'localhost',
    port: 27017,
    user: '',
    pass: '',
    db: 'blog',
    max: 100,
    min: 1,
}))
router.get('/home',(ctx,next)=>{
    ctx.body = "home";
    next();
})
router.get('/user',(ctx,next)=>{
    ctx.body = "user";
    next();
})
app.use(router.routes()).use(router.allowedMethods())
app.use(bodyParser())

app.use(async (ctx, next) => {
    const result = await ctx.mongo.db('blog').collection('blogs').insertOne({
        name: 'haha'
    })
    const userId = result.ops[0]._id.toString()
    ctx.body = await ctx.mongo.db('blog').collection('blogs').find().toArray()
})
app.on('error',(err,ctx) =>{
    log.error("server error",err,ctx);
})
app.listen(2333)
app.listen(2334)