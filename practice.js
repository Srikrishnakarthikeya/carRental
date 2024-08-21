const router = express.router();

router.get('/',(req,res) => 
{
    res.render('index')
})

router.get('/',(req,res) =>
{
    bookingController.getBokingForm(req,res);
})

router.post('/',(req,res) =>
{
   
})

module.exports = router