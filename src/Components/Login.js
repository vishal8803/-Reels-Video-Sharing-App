import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./Login.css"
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import {LOGO, IMG1, IMG2, IMG3, IMG4} from '../utils/Constant';




export default function Login() {
  const useStyles = makeStyles({
    text2:{
        color:'grey',
        textAlign:'center',
        fontSize:'0.9rem',
        padding:'0.5rem'
    },
    text3:{
      textAlign:'center',
    },
    card2:{
      marginTop:'2%'
    }
  })

  const classes = useStyles();
  return (
    <div className='login-body'>
        <div className='crousel-body'>
            <div className='crousel-itself'>
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={4}
                    naturalSlideWidth={238}
                    naturalSlideHeight={423}
                    hasMasterSpinner
                    isPlaying={true}
                    infinite={true}
                    dragEnabled={false}
                    touchEnabled={false}
                >
                    <Slider>
                      <Slide index={0}><Image src={IMG1} /></Slide>
                      <Slide index={1}><Image src={IMG2} /></Slide>
                      <Slide index={2}><Image src={IMG3} /></Slide>
                      <Slide index={3}><Image src={IMG4} /></Slide>
                    </Slider>
                </CarouselProvider>
            </div>
        </div>
        <div className='card-wrapper'>
            <Card sx={{ maxWidth: 360 }} variant="outlined">
            <CardContent>
                <div className='logo-wrapper'>
                  <img src={LOGO} className='logo-img' />
                </div>
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined" fullWidth size='small' margin="dense" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth size='small' margin="dense" />
               <Typography className={classes.text3} color="#1e9df7" variant="subtitle1">
                        Forget Password ?
                </Typography>
               </CardContent>
            <CardActions>
                <Button size="small" fullWidth variant='contained'  >Log In</Button>
            </CardActions>
            </Card>
            <Card sx={{ maxWidth: 360 }} className={classes.card2} variant="outlined">
              <Typography className={classes.text2} variant='subtitle1'>
                  Don't have an account? <Link to="/signup" style={{textDecoration:'none', color:"#1e9df7"}} >Sign up</Link>
              </Typography>
            </Card>
        </div>
    </div>
  );
}
