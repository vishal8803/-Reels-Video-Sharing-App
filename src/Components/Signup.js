import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./Signup.css"
import {LOGO} from '../utils/Constant'
import TextField from '@mui/material/TextField';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';


export default function Signup() {
  const useStyles = makeStyles({
    text1:{
        color:'grey',
        textAlign:'center',
        fontSize:'0.9rem',
        padding:'0.5rem'
    },
    card2:{
      marginTop:'2%'
    }
  })

  const classes = useStyles();
  return (
    <div className='signup-body'>
        <div className='card-wrapper'>
            <Card sx={{ maxWidth: 360 }} variant="outlined">
            <CardContent>
                <div className='logo-wrapper'>
                  <img src={LOGO} className='logo-img' />
                </div>
                <TextField id="outlined-basic" label="Email" type="email" variant="outlined" fullWidth size='small' margin="dense" />
                <TextField id="outlined-basic" label="Password" type="password" variant="outlined" fullWidth size='small' margin="dense" />
                <TextField id="outlined-basic" label="Full Name" type="text" variant="outlined" fullWidth size='small' margin="dense" />
                <Button size="small" color="warning" fullWidth variant='outlined' startIcon={<CloudUploadIcon/>} component="label" >Upload Profile Image  <input type="file" accept="image/*" hidden /></Button>
            </CardContent>
            <CardActions>
                <Button size="small" fullWidth variant='contained'  >Sign Up</Button>
            </CardActions>
            <p className={classes.text1} variant='subtitle1'>
              By signing up, you agree to our Terms, Conditions and Cookies policy.
            </p>
            </Card>
            <Card sx={{ maxWidth: 360 }} className={classes.card2} variant="outlined">
              <Typography className={classes.text1} variant='subtitle1'>
                  Have an account? <Link to="/login" style={{textDecoration:'none', color:"#1e9df7"}} >Log in</Link>
              </Typography>
            </Card>
        </div>
    </div>
  );
}
